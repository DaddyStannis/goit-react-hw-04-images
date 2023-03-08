import { useState, useEffect, useCallback, useMemo } from 'react';
import ImageGallery from './modules/ImageGallery/ImageGallery';
import Searchbar from './modules/Searchbar/Searchbar';
import LoadMoreButton from 'components/modules/LoadMoreButton/LoadMoreButton';
import Modal from 'shared/Modal/Modal';

import { getImages } from './api/images-api';
import Loader from 'shared/Loader/Loader';
import ErrorField from 'shared/ErrorField/ErrorField';

const App = () => {
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeImageId, setActiveImageId] = useState(null);

  const handleSubmit = value => {
    if (value && value !== search) {
      setSearch(value);
      setImages([]);
      setPage(1);
    }
  };

  const handleLoadMoreClick = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, [page]);

  const handleImgOpen = useCallback(id => {
    setActiveImageId(id);
  }, []);

  const handleImgClose = useCallback(() => {
    setActiveImageId(null);
  }, []);

  useEffect(() => {
    const updateImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getImages(search, page);

        if (!data.hits.length) {
          setTotal(0);
          throw new Error('Nothing found!');
        }

        setImages(prevImages => {
          return [...prevImages, ...data.hits];
        });
        setTotal(data.total);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    if (search) {
      updateImages();
    }
  }, [search, page]);

  const showButtonLoadMore = Boolean(images.length < total);

  const activeImage = useMemo(() => {
    return images.find(img => img.id === activeImageId);
  }, [images, activeImageId]);

  return (
    <div className="container">
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} onClick={handleImgOpen} />
      {loading && <Loader />}
      {showButtonLoadMore && (
        <LoadMoreButton text="Load more" onClick={handleLoadMoreClick} />
      )}
      {error && <ErrorField error={error.message} />}

      {activeImageId && (
        <Modal isOpen={Boolean(activeImageId)} onClose={handleImgClose}>
          <img
            src={activeImage.largeImageURL}
            alt={activeImage.tag}
            style={{ maxWidth: '100vw', maxHeight: '100vh' }}
          />
        </Modal>
      )}
    </div>
  );
};

export default App;
