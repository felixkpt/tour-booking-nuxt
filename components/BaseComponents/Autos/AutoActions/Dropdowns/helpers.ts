export const formatEvent = (name: string, newValue: any) => {
    let formattedValue;
  
    if (Array.isArray(newValue)) {
      formattedValue = newValue.map((item) => item.id || item);
    } else {
      formattedValue = newValue.id;
    }
  
    return {
      target: {
        name,
        value: formattedValue,
      },
    };
  };
  