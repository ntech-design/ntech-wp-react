import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';

import { useSearch } from '@/hooks/useSearch';
import { stripHtml, wpText } from '@/utils/template';
import { TbSearch } from 'react-icons/tb';
import DOMPurify from 'dompurify';
import { humanize } from '@/utils/typography';

export default function Search() {
  const {
    term,
    setTerm,
    search,
    results,
    loading,
    hasSearched,
  } = useSearch();

  const dateFormat = new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          label="Search content"
          onKeyDown={(e) => {
            if (e.key === 'Enter') search(term);
          }}
        />

        <Button variant="contained" startIcon={<TbSearch />} onClick={() => search(term)}>Find</Button>
      </Box>

      {loading && (
        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={20} />
          <Typography component="span">Searching...</Typography>
        </Box>
      )}

      {hasSearched && !loading && results.length === 0 && (
        <Typography sx={{ mt: 3 }}>No results found.</Typography>
      )}

      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {results.map((item) => (
          <Box key={item.id} sx={{
            p: 2,
            borderRadius: 'var(--mui-shape-borderRadius)',
            border: '1px solid var(--mui-palette-divider)',
          }}>
            <Typography variant="h3">{ humanize(item.title) }</Typography>
            <Typography variant="body2" className="muted">
              posted in{' '}
              <span className="accent">{ item.category }</span>

              {item.date && (
                <>
                  { ' on ' }
                  { dateFormat.format(new Date(item.date)) }
                </>
              )}
            </Typography>

            <Typography variant="body2" sx={{ mt: 1 }}>
              {item.excerpt
                ? stripHtml(DOMPurify.sanitize(wpText(item.excerpt)))
                : item.content
                  ? stripHtml(DOMPurify.sanitize(wpText(item.content))).slice(0, 180) + '...'
                  : ''
              }
            </Typography>

            { item.url && (<Link to={item.url} className="btn-lifted">Show</Link>) }
          </Box>
        ))}
      </Box>
    </Box>
  );
}