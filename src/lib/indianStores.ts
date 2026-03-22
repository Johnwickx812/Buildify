// Indian shopping site search links

export const getIndianStoreLinks = (productName: string) => {
  const query = encodeURIComponent(productName);
  return [
    {
      name: 'Amazon.in',
      url: `https://www.amazon.in/s?k=${query}&i=computers`,
      color: 'text-orange-400',
    },
    {
      name: 'Flipkart',
      url: `https://www.flipkart.com/search?q=${query}&sid=6bo%2Cb5g`,
      color: 'text-blue-400',
    },
    {
      name: 'MD Computers',
      url: `https://mdcomputers.in/index.php?search=${query}&route=product/search`,
      color: 'text-green-400',
    },
    {
      name: 'Vedant',
      url: `https://www.vedantcomputers.com/index.php?route=product/search&search=${query}`,
      color: 'text-red-400',
    },
  ];
};

export const getAmazonLink = (productName: string) =>
  `https://www.amazon.in/s?k=${encodeURIComponent(productName)}&i=computers`;

export const getFlipkartLink = (productName: string) =>
  `https://www.flipkart.com/search?q=${encodeURIComponent(productName)}&sid=6bo%2Cb5g`;

export const formatINR = (price: number) => {
  return `₹${price.toLocaleString('en-IN')}`;
};
