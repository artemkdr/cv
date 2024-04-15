import { useTranslation } from 'react-i18next';

const useTranslationsList = (key : string) => {
    const { t } = useTranslation();

    let o : any[] = t(key + ".List", { returnObjects: true });
    let list = [];
    if (typeof(o) === 'object' && o.length > 0) {
        for (var i = 0; i < o.length; i++) {
          var k = key + ".List." + i;
          list.push(t(k));
        }
    }
    return list;
  } 

export default useTranslationsList;