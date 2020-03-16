/**
 * @description
 *   Deep cloning the JS Object
 *
 * @param data
 * @return {*} - cloned object or null
 */
export function deepClone <T>(data: T) : T | null {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (e) {
    return null;
  }
}

/**
 * @description
 *
 *     Shallow cloning the JS Object. which is used to clone the
 *  first child keys of the object not nested object or nested array.
 *
 * @param data
 * @return {*} - cloned object or null
 */
export function shallowClone <T>(data: T): T | null {
  if (!data) return null;
  if (typeof data === 'object') {
    return {
      ...data
    };
  } else {
    return null;
  }
}

/**
 * @description
 *
 *   This function is used to test the data is array or not.
 *
 * @param data
 * @return {*}
 */
export function isArray <T>(data: Array<T>): boolean {
  if (!data) return false;

  try {
    return Array.isArray(data);
  } catch (e) {
    return false;
  }
}

/**
 * @description
 *
 *   This function is used to validate the data empty or not
 *
 * @param data
 * @return {boolean}
 */
export function isEmpty <T>(data: T): boolean {
  return !data;
}

/**
 * @description
 *   Format an Date / Date String to mm/dd/yyyy format
 *
 * @param data
 * @return {*} - Date format in mm/dd/yyyy
 */
export function toDateformat (data: Date) {
  try {
    data = new Date(data);

    let dd = data.getDate().toString();

    let mm = (data.getMonth() + 1).toString();

    const yyyy = data.getFullYear();

    if (+dd < 10) dd = '0' + dd;

    if (+mm < 10) mm = '0' + mm;

    return mm + '/' + dd + '/' + yyyy;
  } catch (e) {
    return null;
  }
}

/**
 * @description
 *   extract Time (hh:mm) from an Date / Date String
 *
 * @param data
 * @return {*} - Time format in hh:mm
 */
export function toTimeformat (data: Date) {
  try {
    return new Date(data).toISOString().replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, '$1');
  } catch (e) {
    return null;
  }
}

export function mapValuesToArray <T>(mapData: Object): T[] | any {
  try {
    if (!mapData) return null;
    const tempArr: T[] = [];
    Object.keys(mapData).forEach((key) => {
      // @ts-ignore
      tempArr.push(mapData[key] as T);
    });
    return tempArr;
  } catch (e) {
    return null;
  }
}
