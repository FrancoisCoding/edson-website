export const whatsappNumber = "5548999951470";

export const whatsappBaseUrl = `https://wa.me/${whatsappNumber}`;

export const buildWhatsappUrl = (message?: string) => {
  if (!message) {
    return whatsappBaseUrl;
  }

  return `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
};
