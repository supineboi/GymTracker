export const validateType = (value, type) => {
  switch (type) {
    case "int": {
      const n = Number(value);
      return Number.isInteger(n);
    }

    case "float": {
      const n = Number(value);
      return Number.isFinite(n);
    }

    case "text": {
      return typeof value === "string" &&
             /^[a-zA-Z ]+$/.test(value.trim());
    }

    default:
      return true;
  }
};

export const getValidationError = (value, type, range = null) => {
  if (!range || !Array.isArray(range) || range.length !== 2) {
    return null;
  }

  const [min, max] = range;

  // TEXT → character count (spaces included)
  if (type === "text") {
    const charCount = value.trim().length;  
    if (charCount < min) return `Text must be at least ${min} character(s).`;
    if (charCount > max) return `Text must not exceed ${max} character(s).`;  
    return null;
  }   

  // NUMBERS → numeric range (int or float)
  const n = Number(value);

  if (n < min) return `Value must be at least ${min}.`;
  if (n > max) return `Value must be at most ${max}.`;

  return null;
};

