import CardList from '../../common/card-list/CardList';
import { useState, useEffect } from 'react';

const NewsList = () => {
  const [newsList, setNewsList] = useState<
    { article_id: string; title: string; image_url: string; description: string; link: string }[]
  >([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          'https://newsdata.io/api/1/news?apikey=pub_4058515151c616834f37ed50f02107c4e64cf&country=vi&language=vi&category=business'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();

        // Filter news items where "business" exists in the category array
        const filteredNews = data.results.filter((item: any) =>
          item.category?.includes('business')
        );

        setNewsList(filteredNews);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold">LATEST NEWS</h2>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {newsList.length > 0 ? (
            newsList.slice(0, 8).map((card) => (
              <CardList
                isProperties={false}
                key={card.article_id?.toString()} // Use title as fallback if id is missing
                id={card.article_id?.toString() || ''}
                title={card.title || 'No Title'}
                imgSrc={card.image_url || 'default-image.png'} // Provide a default image URL
                description={card.description || 'No description available.'}
                link={card.link}
                priceStart={''}
                endDay={''}
                startDay={''}
                endTime={''}
                targetDate={new Date()}
                isApproved={''}
                url={''}
              />
            ))
          ) : (
            <p className="col-span-4 text-center">No news available.</p>
          )}
        </div>
      </div>
    </>
  );
};
export default NewsList;
