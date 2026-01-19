export type Listing = {
  id: string;
  slug: string;
  cityKey: "saoPaulo" | "rioDeJaneiro" | "balnearioCamboriu" | "trancoso";
  typeKey: "house" | "apartment" | "penthouse";
  price: number;
  beds: number;
  baths: number;
  area: number;
  images: string[];
};

export const listings: Listing[] = [
  {
    id: "listing-aurora",
    slug: "aurora",
    cityKey: "saoPaulo",
    typeKey: "house",
    price: 18500000,
    beds: 5,
    baths: 6,
    area: 620,
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1400&q=80"
    ]
  },
  {
    id: "listing-leblon",
    slug: "leblon",
    cityKey: "rioDeJaneiro",
    typeKey: "penthouse",
    price: 24000000,
    beds: 4,
    baths: 5,
    area: 480,
    images: [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1400&q=80"
    ]
  },
  {
    id: "listing-jardins",
    slug: "jardins",
    cityKey: "saoPaulo",
    typeKey: "apartment",
    price: 9900000,
    beds: 3,
    baths: 4,
    area: 280,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80"
    ]
  },
  {
    id: "listing-barra",
    slug: "barra",
    cityKey: "rioDeJaneiro",
    typeKey: "house",
    price: 13800000,
    beds: 4,
    baths: 5,
    area: 520,
    images: [
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=1400&q=80"
    ]
  },
  {
    id: "listing-panorama",
    slug: "panorama",
    cityKey: "balnearioCamboriu",
    typeKey: "penthouse",
    price: 17200000,
    beds: 4,
    baths: 5,
    area: 410,
    images: [
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1400&q=80"
    ]
  },
  {
    id: "listing-trancoso",
    slug: "trancoso",
    cityKey: "trancoso",
    typeKey: "house",
    price: 21000000,
    beds: 5,
    baths: 6,
    area: 750,
    images: [
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1400&q=80"
    ]
  }
];
