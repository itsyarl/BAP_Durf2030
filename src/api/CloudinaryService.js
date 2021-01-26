import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core';

class CloudinaryService {
  url = (publicId, options) => {
    const scOptions = Util.withSnakeCaseKeys(options);
    const cl = CoreCloudinary.new();
    return cl.url(publicId, scOptions);
  };
  
  fetchPhotos = async (imageTag, setter) => {
    const options = {
    cloudName: 'emkaydee',
    format: 'json',
    type: 'list',
    version: Math.ceil(new Date().getTime() / 1000),
  };
  
  const urlPath = this.url(imageTag.toString(), options);
  
  fetch(urlPath)
  .then(res => res.text())
  .then(text => (text ? setter(JSON.parse(text).resources.map(image => image.public_id)) : []))
  .catch(err => console.log(err));
  };
}

export default CloudinaryService;