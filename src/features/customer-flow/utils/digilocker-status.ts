export function getDigilockerStatus(status?: string) {
  const verified = status?.toLowerCase() === "verified";

  return {
    label: verified ? "Verified" : "--",
    verified,
  };
}
