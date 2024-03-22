import { useTranslation } from 'react-i18next';

const useTranslationsList = (key) => {
    const { t } = useTranslation();

    var o = t(key + ".List", { returnObjects: true });
    var list = [];
    if (typeof(o) === 'object' && o.length > 0) {
        for (var i = 0; i < o.length; i++) {
          var k = key + ".List." + i;
          list.push(t(k));
        }
    }
    return list;
  } 

export default useTranslationsList;