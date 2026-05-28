import { createClient } from '@supabase/supabase-js';
import { clientEnv } from '../src/lib/client.ts';

const supabaseUrl = clientEnv.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
  console.error(
    'Error: SUPABASE_SERVICE_ROLE_KEY is required to update the database.\n' +
    'Get it from: Supabase Dashboard → Project Settings → API → service_role key\n' +
    'Then add SUPABASE_SERVICE_ROLE_KEY=<key> to your .env file and re-run.'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const TARGET_WIDTH = 400;

function extractDriveFileId(url: string): string | null {
  // Already in thumbnail format
  const thumbnailMatch = url.match(
    /drive\.google\.com\/thumbnail\?.*[?&]id=([A-Za-z0-9_-]+)/
  );
  if (thumbnailMatch) return thumbnailMatch[1];

  // /file/d/FILE_ID/view or /preview
  const filePathMatch = url.match(/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)/);
  if (filePathMatch) return filePathMatch[1];

  // uc?export=view&id=ID, uc?id=ID, open?id=ID
  const queryIdMatch = url.match(
    /drive\.google\.com\/(?:uc|open)\?.*[?&]id=([A-Za-z0-9_-]+)/
  );
  if (queryIdMatch) return queryIdMatch[1];

  return null;
}

function buildThumbnailUrl(fileId: string): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${TARGET_WIDTH}`;
}

async function migrate() {
  console.log('Fetching all movies from Supabase...');

  const { data: movies, error: fetchError } = await supabase
    .from('movies')
    .select('id, link_cover');

  if (fetchError) {
    console.error('Failed to fetch movies:', fetchError.message);
    process.exit(1);
  }

  if (!movies || movies.length === 0) {
    console.log('No movies found. Nothing to migrate.');
    return;
  }

  console.log(`Found ${movies.length} movies. Processing...`);

  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const movie of movies) {
    const fileId = extractDriveFileId(movie.link_cover ?? '');

    if (!fileId) {
      console.warn(
        `  [SKIP] Movie ${movie.id}: could not parse FILE_ID from "${movie.link_cover}"`
      );
      skipped++;
      continue;
    }

    const newUrl = buildThumbnailUrl(fileId);

    if (movie.link_cover === newUrl) {
      skipped++;
      continue;
    }

    const { error: updateError } = await supabase
      .from('movies')
      .update({ link_cover: newUrl })
      .eq('id', movie.id);

    if (updateError) {
      console.error(`  [FAIL] Movie ${movie.id}: ${updateError.message}`);
      failed++;
    } else {
      console.log(`  [OK]   Movie ${movie.id}: ${movie.link_cover} -> ${newUrl}`);
      updated++;
    }
  }

  console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}, Failed: ${failed}`);

  if (failed > 0) {
    process.exit(1);
  }
}

migrate();
