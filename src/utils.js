// utility to shorten an address
// Yes, copilot wrote this for me
export const shortenAddress = (address) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};
