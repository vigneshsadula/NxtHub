import { Campaign, Influencer, CampaignStatus } from '../types';
import { MOCK_CAMPAIGNS, MOCK_INFLUENCERS } from '../constants';

const CAMPAIGNS_KEY = 'nxthub_campaigns_data';
const INFLUENCERS_KEY = 'nxthub_influencers_data';

export const dataService = {
  // --- Campaigns ---
  getCampaigns: (): Campaign[] => {
    try {
      const stored = localStorage.getItem(CAMPAIGNS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Error parsing campaigns from storage", e);
    }
    // Initialize with mocks if empty
    localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(MOCK_CAMPAIGNS));
    return MOCK_CAMPAIGNS;
  },

  saveCampaigns: (campaigns: Campaign[]) => {
    localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(campaigns));
  },

  updateCampaignStatus: (id: string, status: CampaignStatus): Campaign[] => {
    const campaigns = dataService.getCampaigns();
    const updated = campaigns.map(c => c.id === id ? { 
      ...c, 
      status, 
      lastUpdated: new Date().toISOString() 
    } : c);
    dataService.saveCampaigns(updated);
    return updated;
  },

  addCampaign: (campaign: Campaign): Campaign[] => {
    const campaigns = dataService.getCampaigns();
    // Ensure lastUpdated is set on creation
    const newCampaign = { ...campaign, lastUpdated: new Date().toISOString() };
    const updated = [newCampaign, ...campaigns];
    dataService.saveCampaigns(updated);
    return updated;
  },

  completeCampaign: (id: string, date: string, summary: string): Campaign[] => {
    const campaigns = dataService.getCampaigns();
    const updated = campaigns.map(c => c.id === id ? { 
        ...c, 
        status: 'Completed' as CampaignStatus, 
        completionDate: date, 
        completionSummary: summary,
        lastUpdated: new Date().toISOString()
    } : c);
    dataService.saveCampaigns(updated);
    return updated;
  },

  // --- Influencers ---
  getInfluencers: (): Influencer[] => {
    try {
      const stored = localStorage.getItem(INFLUENCERS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Error parsing influencers from storage", e);
    }
    localStorage.setItem(INFLUENCERS_KEY, JSON.stringify(MOCK_INFLUENCERS));
    return MOCK_INFLUENCERS;
  },

  addInfluencer: (influencer: Influencer): Influencer[] => {
    const influencers = dataService.getInfluencers();
    const updated = [influencer, ...influencers];
    localStorage.setItem(INFLUENCERS_KEY, JSON.stringify(updated));
    return updated;
  },

  updateInfluencer: (updatedInfluencer: Influencer): Influencer[] => {
    const influencers = dataService.getInfluencers();
    const updated = influencers.map(i => i.id === updatedInfluencer.id ? updatedInfluencer : i);
    localStorage.setItem(INFLUENCERS_KEY, JSON.stringify(updated));
    return updated;
  },

  deleteInfluencer: (id: string): Influencer[] => {
    const influencers = dataService.getInfluencers();
    const updated = influencers.filter(i => i.id !== id);
    localStorage.setItem(INFLUENCERS_KEY, JSON.stringify(updated));
    return updated;
  }
};