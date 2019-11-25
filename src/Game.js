import React, { useState, useEffect } from 'react';
import './RandomTemplates.css';
import Quote from './QuoteTemplate';
import Image from './ImageTemplate';
import Loading from './Loading';
import { fetchImages, fetchQuotes } from './APIFetcher';

export default function Game(props) {
  const [loading, setLoading] = useState(true);

  const [images, setImages] = useState([]);
  const [quotes, setQuotes] = useState([]);

  const [similarity, setSimilarity] = useState('');
  const [similarities, setSimilarities] = useState([]);

  const [currP1, setCurrP1] = useState({});
  const [currP2, setCurrP2] = useState({});
  const [currImgId, setCurrImgId] = useState(0);
  const [currQuoteId, setCurrQuoteId] = useState(0);

  const [countPrompts, setCountPrompts] = useState(0);
  const totalPrompts = props.match.params.numQs;

  // load all the prompts
  useEffect(() => {
    // const [fetchedImages, fetchedQuotes] = Promise.all([
    //   fetchImages(),
    //   fetchQuotes()
    // ]);
    //
    // console.log(fetchedImages);
    // setImages(fetchedImages);
    //
    // setCurrP2({
    //   type: 'img',
    //   url: fetchedImages[currImgId].download_url
    // });
    // setCurrImgId(currImgId + 1);
    // setCountPrompts(countPrompts + 1);
    //
    // console.log(fetchedQuotes);
    // setQuotes(fetchQuotes);
    //
    // setCurrP2({
    //   type: 'img',
    //   url: fetchedImages[currImgId].download_url
    // });
    // setCurrImgId(currImgId + 1);
    // setCountPrompts(countPrompts + 1);
    //
    // setLoading(false);
    fetchImages().then(fetchedImages => {
      console.log(fetchedImages);
      setImages(fetchedImages);

      setCurrP2({
        type: 'img',
        url: fetchedImages[currImgId].download_url.replace(/\/[0-9]+\/[0-9]+$/, '/300/200')
      });
      setCurrImgId(currImgId + 1);
    });

    fetchQuotes().then(fetchedQuotes => {
      console.log(fetchedQuotes);
      let quotes = [];
      fetchedQuotes.quotes.forEach((quoteInfo) => {
        quotes.push({
          author: quoteInfo.author,
          quote: quoteInfo.body
        });
      });
      setQuotes(quotes);

      setCurrP1({
        type: 'quote',
        quote: quotes[currQuoteId].quote,
        author: quotes[currQuoteId].author
      });
      setCurrQuoteId(currQuoteId + 1);
    });

    setCountPrompts(countPrompts + 1);
    setLoading(false);
  }, []);

  function handleChangeSimilarity(event) {
    setSimilarity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(similarity.length >= 3) {
      // store user response
      setSimilarities(similarities.concat({
        similarity: similarity,
        p1: currP1,
        p2: currP2
      }));

      // clear out the input
      setSimilarity('');

      if(countPrompts < totalPrompts) { // still have prompts to go
          setCurrP1({
            type: 'quote',
            quote: quotes[currQuoteId].quote,
            author: quotes[currQuoteId].author
          });
          setCurrQuoteId(currQuoteId + 1);

          setCurrP2({
            type: 'img',
            url: images[currImgId].download_url.replace(/\/[0-9]+\/[0-9]+$/, '/300/200')
          });
          setCurrImgId(currImgId + 1);
          setCountPrompts(countPrompts + 1);
      }
      else {
        console.log('yippee!');
      }
    }
  }

  return (
    <>
      { loading ? <Loading/> :
        <div className="row">
          <div className="col-12 col-md-6 d-flex justify-content-center align-items-center text-center border_bisection">
            <Quote quote={currP1.quote} author={currP1.author}/>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center align-items-center text-center">
            <Image url={currP2.url}/>
          </div>
          <div className="mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="text-center">
                  <label htmlFor="similarityField">Come Up with a Similarity</label>
                </div>
                <div className="">
                  <input type="text" className="form-control text-center" id="similarityField"
                    placeholder="..." max="12" autoFocus={true}
                    value={similarity} onChange={handleChangeSimilarity}/>
                </div>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  );
}
