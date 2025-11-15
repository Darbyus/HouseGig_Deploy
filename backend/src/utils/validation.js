export const validateListingInput = (data) => {
  const errors = [];

  if (!data.title || data.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters');
  }

  if (!data.world || data.world.trim().length < 2) {
    errors.push('World name is required');
  }

  if (!data.property_type) {
    errors.push('Property type is required');
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.push('Description must be at least 10 characters');
  }

  if (data.price === null || data.price === undefined) {
    errors.push('Price is required');
  }

  return errors;
};

export const validateCollectionInput = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Collection name must be at least 2 characters');
  }

  return errors;
};

export const validateCommentInput = (data) => {
  const errors = [];

  if (!data.content || data.content.trim().length < 1) {
    errors.push('Comment cannot be empty');
  }

  if (data.content.length > 500) {
    errors.push('Comment must be less than 500 characters');
  }

  return errors;
};
