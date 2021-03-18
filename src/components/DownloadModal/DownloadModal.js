import React, {useState} from 'react';
import './DownloadModal.css';

const DownloadModal = ({ setClickedDownload, downloadGardenImage, setTextPathColor, textPathColor}) => {
  const [imageBackground, setImageBackground] = useState('');

  const toggleTextPathColor = (value) => {
    console.log('toggleColor', value, value === 'transparent')
    const color = value === 'transparent' ? '#222323' : '#ffff';
    setTextPathColor(color);
  }

  return (
    <>
      <div className="modal-wrapper">
        <article className="modal">
          <button className="close" onClick={() => {
            setClickedDownload(false)
            setTextPathColor('#ffff');
          }}>X</button>
          <section className='download-modal-content'>
            <p>You can download your current garden as a png for safekeeping. Choose whether you would like to keep our dark background (best for sharing on social networks) or save the garden with a transparent background (best for a playful flourish at the bottom of your resume):</p>
            <form className='download-options'>
              <label>
                <input
                  type="radio"
                  value="dark"
                  className='download-input'
                  checked={imageBackground === "dark"}
                  onChange={(event) => {
                    setImageBackground(event.target.value);
                    toggleTextPathColor(event.target.value);
                  }}
                />
                Dark Background
              </label>
              <label>
                <input
                  type="radio"
                  value="transparent"
                  className='download-input'
                  checked={imageBackground === "transparent"}
                  onChange={(event) => {
                    setImageBackground(event.target.value);
                    toggleTextPathColor(event.target.value);
                  }}
                />
                Transparent Background
              </label>
            </form>
            <button onClick={() => downloadGardenImage(imageBackground)}>Download</button>
          </section>
        </article>
      </div>
    </>
  )
}

export default DownloadModal;
