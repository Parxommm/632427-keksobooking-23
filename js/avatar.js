const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarInput = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const adPhotoInput = document.querySelector('#images');

const uploadPhoto = (fileChooser, preview) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

avatarInput.addEventListener('change', () => {
  uploadPhoto(avatarInput, avatarPreview);
});

adPhotoInput.addEventListener('change', () => {
  const imgElement = document.createElement('img');
  const photoPreview = document.querySelector('.ad-form__photo').appendChild(imgElement);
  imgElement.style.width = '70px';
  imgElement.style.height = '70px';
  uploadPhoto(adPhotoInput, photoPreview);
});
