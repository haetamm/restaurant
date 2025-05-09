export const errorHandle = (error: any) => {
  const errorMessage = error.response?.data?.message;
  if (Array.isArray(errorMessage)) {
    const messages = errorMessage.map((e) => e.message).filter(Boolean);
    throw new Error(
      messages.length > 0 ? messages.join('\n') : 'Validation error',
    );
  }
  throw new Error(errorMessage || error.message || 'Unknown error');
};
