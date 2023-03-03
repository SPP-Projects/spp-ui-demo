export default function useCampaignHelper() {
  const calculateCampaignProgress = (donated, goal) => {
    return ((100 * parseInt(donated)) / parseInt(goal)).toFixed(0);
  };

  const replaceImageUrl = (url) => {
    return url.replace("sppay.dev", "engine.sppay.dev");
  };

  return {
    calculateCampaignProgress,
    replaceImageUrl,
  };
}
