export const getFormData = (formObject: any = {}, valueImg: string) => {
  let formBody = new FormData();
  for (let property in formObject) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = formObject[property];
    if (valueImg === encodedKey) {
      encodedValue.map((item: any) => {
        formBody.append(`${encodedKey}[]`, item);
      });
    } else if (Array.isArray(encodedValue)) {
      formBody.append(encodedKey, JSON.stringify(encodedValue));
    } else {
      formBody.append(encodedKey, encodedValue);
    }
  }
  return formBody;
};
