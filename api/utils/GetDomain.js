const GetDomain = () => {
  const domain = process.env.NEXT_PUBLIC_URL_DOMAIN;
  return domain;
};

export default GetDomain;