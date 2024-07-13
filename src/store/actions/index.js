import axios from 'axios';
import { toast } from 'react-toastify';
export const NOT_EKLE = 'NOT_EKLE';
export const NOT_SIL = 'NOT_SIL';
export const NOTLARI_AL = 'NOTLARI_AL';

export function notEkle(not) {
  return { type: NOT_EKLE, payload: not };
}

export function notSil(notId) {
  return { type: NOT_SIL, payload: notId };
}

export function notlariAl(notlar) {
  return { type: NOTLARI_AL, payload: notlar };
}

export const notEkleAPI = (yeniNot) => (dispatch) => {
  const toastEkle = toast.loading('Notunu kaydediyoruz...');
  axios
    .post('https://nextgen-project.onrender.com/api/s10d5/gratitudes', yeniNot)
    .then((res) => {
      if (res.status === 201) {
        toast.update(toastEkle, {
          render:
            'Notun başarıyla kaydedildi. Güzelliklerle dolu bir gün dileğiyle...',
          type: 'success',
          isLoading: false,
          autoClose: 2000,
        });

        dispatch(notEkle(res.data));
      }
    })
    .catch((error) => console.log(error));
};

export const notlariAlAPI = () => (dispatch) => {
  axios
    .get('https://nextgen-project.onrender.com/api/s10d5/gratitudes')
    .then((res) => {
      if (res.status === 200) {
        dispatch(notlariAl(res.data));
      }
    })
    .catch((error) => console.log(error));
};

// notSilAPI buraya
export const notSilAPI = (id) => (dispatch) => {
  const toastSil = toast.loading('Siliyoruz...');
  axios
    .delete(`https://nextgen-project.onrender.com/api/s10d5/gratitudes/${id}`)
    .then((res) => {
      if (res.status === 200) {
        toast.update(toastSil, {
          render: 'Notunuz silindi...',
          type: 'info',
          isLoading: false,
          autoClose: 2000,
        });

        dispatch(notSil(id));
      }
    })
    .catch((error) => {
      console.log(error);
      toast.update(toastSil, {
        render: 'Bir hata oluştu!',
        type: 'warning',
        isLoading: false,
        autoClose: 1000,
      });
    });
};
