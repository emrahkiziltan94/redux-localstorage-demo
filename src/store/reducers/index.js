import { NOTLARI_AL, NOT_EKLE, NOT_SIL } from '../actions';

const s10chLocalStorageKey = 's10d5';

const baslangicDegerleri = {
  notlar: [],
};

function localStorageStateYaz(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function localStorageStateOku(key) {
  return JSON.parse(localStorage.getItem(key));
}

function baslangicNotlariniGetir(key) {
  const eskiNotlar = localStorage.getItem(key);

  if (eskiNotlar !== null) {
    return localStorageStateOku(key);
  } else {
    localStorageStateYaz(key, baslangicDegerleri);
    return baslangicDegerleri;
  }
}

function reducer(
  state = baslangicNotlariniGetir(s10chLocalStorageKey),
  action
) {
  switch (action.type) {
    case NOTLARI_AL:
      localStorageStateYaz(s10chLocalStorageKey, action.payload);
      return {
        notlar: action.payload,
      };
    case NOT_EKLE:
      const yeniNotlar = {
        ...state,
        notlar: [action.payload, ...state.notlar],
      };
      localStorageStateYaz(s10chLocalStorageKey, yeniNotlar);
      return yeniNotlar;

    case NOT_SIL:
      const kalanNotlar = {
        ...state,
        notlar: state.notlar.filter((not) => not.id !== action.payload),
      };
      localStorageStateYaz(s10chLocalStorageKey, kalanNotlar);
      return kalanNotlar;
    default:
      return state;
  }
}

export default reducer;
