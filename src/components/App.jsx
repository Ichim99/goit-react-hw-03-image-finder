import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchImages, PER_PAGE } from './Api/PixabayApi';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { toast } from 'react-toastify';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [currentImgPerPage, setCurrentImgPerPage] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        setShowModal(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal]);

  useEffect(() => {
    getImagesData();
  }, [query, page]);

  const handleFormSubmit = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMoreImg = () => {
    getImagesData();
  };

  const getImagesData = async () => {
    try {
      setLoading(true);
      const { hits, totalHits } = await fetchImages(page, query);
      if (totalHits === 0) {
        toast.error('Images not found ...');
        setLoading(false);
        setCurrentImgPerPage(null);
        return;
      }
      const newImages = hits.map(({ id, largeImageURL, tags, webformatURL }) => ({
        id,
        largeImageURL,
        tags,
        webformatURL,
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
      setCurrentImgPerPage(hits.length);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const openModal = (largeImage) => {
    setLargeImage(largeImage);
    toggleModal();
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length > 0 && !error && (
        <>
          <ImageGallery images={images} onClick={openModal} />
          {currentImgPerPage && currentImgPerPage < PER_PAGE && (
            <p className="Message">No more pictures</p>
          )}
        </>
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt="" />
        </Modal>
      )}
      {currentImgPerPage === PER_PAGE && !loading && (
        <Button onClick={handleLoadMoreImg} />
      )}
      {loading && <Loader />}
    </div>
  );
};


