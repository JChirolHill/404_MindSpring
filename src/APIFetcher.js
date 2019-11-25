const IMAGE_API_URL = 'https://picsum.photos/v2/list';
const QUOTE_API_URL = 'https://favqs.com/api/quotes';

export async function fetchImages() {
  let randPage = parseInt(Math.random() * 30);
  console.log(`${IMAGE_API_URL}?page=${randPage}`);
  let fetchedImages = await fetch(`${IMAGE_API_URL}?page=${randPage}`);
  return fetchedImages.json();
}

export async function fetchQuotes() {
  let fetchedQuotes = await fetch(QUOTE_API_URL, {
    headers:  {
      'Authorization': 'Token token="9313a2c53feecb17a35185d0b8a1db8c"'
    }
  });
  return fetchedQuotes.json();
}
