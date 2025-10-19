/**
 * Resim Düzenleme Bileşeni
 * Yüklemeden önce resimleri kırpma, döndürme ve sıkıştırma imkanı sağlar
 */
import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, RotateCw, Check, Loader } from 'lucide-react';

const ImageCropModal = ({ image, onComplete, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [processing, setProcessing] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    canvas.width = safeArea;
    canvas.height = safeArea;

    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-safeArea / 2, -safeArea / 2);

    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5
    );

    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(
      data,
      Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
      Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    );

    return canvas;
  };

  const compressImage = async (canvas, quality = 0.8) => {
    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        'image/jpeg',
        quality
      );
    });
  };

  const handleComplete = async () => {
    try {
      setProcessing(true);

      // Resmi kırp
      const canvas = await getCroppedImg(image, croppedAreaPixels, rotation);

      // Resmi sıkıştır
      let quality = 0.9;
      let blob = await compressImage(canvas, quality);

      // Boyut 500KB'dan büyükse, kaliteyi azalt
      while (blob.size > 500 * 1024 && quality > 0.3) {
        quality -= 0.1;
        blob = await compressImage(canvas, quality);
      }

      // Boyut hala büyükse, boyutları küçült
      if (blob.size > 500 * 1024) {
        const maxWidth = 800;
        const maxHeight = 800;
        const ratio = Math.min(maxWidth / canvas.width, maxHeight / canvas.height);
        
        const resizedCanvas = document.createElement('canvas');
        resizedCanvas.width = canvas.width * ratio;
        resizedCanvas.height = canvas.height * ratio;
        
        const ctx = resizedCanvas.getContext('2d');
        ctx.drawImage(canvas, 0, 0, resizedCanvas.width, resizedCanvas.height);
        
        blob = await compressImage(resizedCanvas, 0.8);
      }

      // Blob'u File'a dönüştür
      const file = new File([blob], 'profile-photo.jpg', {
        type: 'image/jpeg',
        lastModified: Date.now(),
      });

      console.log('Original size:', (blob.size / 1024).toFixed(2) + ' KB');
      console.log('Compressed size:', (file.size / 1024).toFixed(2) + ' KB');

      onComplete(file);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Resim işlenirken bir hata oluştu');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Resmi Düzenle</h3>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={processing}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cropper */}
        <div className="relative h-96 bg-gray-900">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* Controls */}
        <div className="p-6 space-y-4">
          {/* Zoom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Yakınlaştırma/Uzaklaştırma
            </label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full"
              disabled={processing}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleRotate}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={processing}
            >
              <RotateCw className="w-4 h-4" />
              <span>Döndür</span>
            </button>

            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={processing}
              >
                İptal
              </button>
              <button
                onClick={handleComplete}
                disabled={processing}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg font-semibold"
              >
                {processing ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>İşleniyor...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Kaydet</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Info */}
          <p className="text-sm text-gray-500 text-center">
            Resim otomatik olarak sıkıştırılacak ve dosya boyutu azaltılacaktır
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;
