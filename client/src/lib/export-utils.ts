import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export interface ExportData {
  [key: string]: any;
}

export interface ExportOptions {
  filename?: string;
  sheetName?: string;
  format: 'csv' | 'xlsx' | 'pdf';
}

// CSV Export
export const exportToCSV = (data: ExportData[], filename: string = 'export.csv') => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle values that contain commas, quotes, or newlines
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
};

// Excel Export
export const exportToExcel = (data: ExportData[], options: ExportOptions) => {
  if (data.length === 0) return;

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, options.sheetName || 'Sheet1');
  
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, options.filename || 'export.xlsx');
};

// PDF Export (using jsPDF)
export const exportToPDF = async (data: ExportData[], options: ExportOptions) => {
  try {
    // Dynamic import to avoid bundling jsPDF in the main bundle
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();

    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const tableData = data.map(row => headers.map(header => row[header]));

    // Add title
    doc.setFontSize(16);
    doc.text(options.filename?.replace('.pdf', '') || 'Export Report', 14, 20);

    // Add table
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 30,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [59, 130, 246], // Blue color
        textColor: 255,
      },
    });

    doc.save(options.filename || 'export.pdf');
  } catch (error) {
    console.error('PDF export failed:', error);
    // Fallback to CSV if PDF fails
    exportToCSV(data, options.filename?.replace('.pdf', '.csv') || 'export.csv');
  }
};

// Generic export function
export const exportData = async (data: ExportData[], options: ExportOptions) => {
  switch (options.format) {
    case 'csv':
      exportToCSV(data, options.filename);
      break;
    case 'xlsx':
      exportToExcel(data, options);
      break;
    case 'pdf':
      await exportToPDF(data, options);
      break;
    default:
      throw new Error(`Unsupported export format: ${options.format}`);
  }
};

// Specific export functions for different data types
export const exportCampaignData = (campaigns: any[], format: 'csv' | 'xlsx' | 'pdf' = 'csv') => {
  // Generate sample campaign data if no campaigns provided
  const sampleCampaigns = campaigns && campaigns.length > 0 ? campaigns : [
    {
      name: 'Summer Sale 2024',
      platform: 'Facebook',
      status: 'active',
      budget: '$15,000',
      spent: '$12,450',
      impressions: 1250000,
      clicks: 45000,
      ctr: '3.6%',
      conversions: 2800,
      roas: '5.2x',
      createdAt: '2024-01-15'
    },
    {
      name: 'Brand Awareness Q4',
      platform: 'Google Ads',
      status: 'active',
      budget: '$20,000',
      spent: '$18,200',
      impressions: 2100000,
      clicks: 52000,
      ctr: '2.5%',
      conversions: 3200,
      roas: '4.8x',
      createdAt: '2024-01-10'
    },
    {
      name: 'Holiday Campaign',
      platform: 'Instagram',
      status: 'paused',
      budget: '$12,000',
      spent: '$8,900',
      impressions: 980000,
      clicks: 28000,
      ctr: '2.9%',
      conversions: 1800,
      roas: '6.1x',
      createdAt: '2024-01-05'
    },
    {
      name: 'Product Launch',
      platform: 'LinkedIn',
      status: 'active',
      budget: '$25,000',
      spent: '$22,100',
      impressions: 1800000,
      clicks: 38000,
      ctr: '2.1%',
      conversions: 2400,
      roas: '3.9x',
      createdAt: '2024-01-20'
    },
    {
      name: 'Retargeting Campaign',
      platform: 'Facebook',
      status: 'active',
      budget: '$8,000',
      spent: '$6,750',
      impressions: 650000,
      clicks: 22000,
      ctr: '3.4%',
      conversions: 1600,
      roas: '7.2x',
      createdAt: '2024-01-12'
    }
  ];

  const data = sampleCampaigns.map(campaign => ({
    'Campaign Name': campaign.name,
    'Platform': campaign.platform,
    'Status': campaign.status,
    'Budget': campaign.budget,
    'Spent': campaign.spent,
    'Impressions': campaign.impressions,
    'Clicks': campaign.clicks,
    'CTR': campaign.ctr,
    'Conversions': campaign.conversions,
    'ROAS': campaign.roas,
    'Created Date': campaign.createdAt,
  }));

  const options: ExportOptions = {
    filename: `campaigns-${new Date().toISOString().split('T')[0]}.${format}`,
    sheetName: 'Campaigns',
    format,
  };

  return exportData(data, options);
};

export const exportAudienceData = (audienceData: any[], format: 'csv' | 'xlsx' | 'pdf' = 'csv') => {
  // Generate sample audience data if no data provided
  const sampleAudienceData = audienceData && audienceData.length > 0 ? audienceData : [
    {
      date: '2024-01-01',
      users: 125000,
      newUsers: 8500,
      returningUsers: 116500,
      engagementRate: '4.2%',
      source: 'Organic Search',
      location: 'United States'
    },
    {
      date: '2024-01-02',
      users: 132000,
      newUsers: 9200,
      returningUsers: 122800,
      engagementRate: '4.5%',
      source: 'Social Media',
      location: 'United States'
    },
    {
      date: '2024-01-03',
      users: 128500,
      newUsers: 7800,
      returningUsers: 120700,
      engagementRate: '4.1%',
      source: 'Direct',
      location: 'United Kingdom'
    },
    {
      date: '2024-01-04',
      users: 141000,
      newUsers: 10500,
      returningUsers: 130500,
      engagementRate: '4.8%',
      source: 'Paid Advertising',
      location: 'Canada'
    },
    {
      date: '2024-01-05',
      users: 135500,
      newUsers: 8900,
      returningUsers: 126600,
      engagementRate: '4.3%',
      source: 'Email Marketing',
      location: 'Australia'
    }
  ];

  const data = sampleAudienceData.map(item => ({
    'Date': item.date,
    'Total Users': item.users,
    'New Users': item.newUsers,
    'Returning Users': item.returningUsers,
    'Engagement Rate': item.engagementRate,
    'Source': item.source,
    'Location': item.location,
  }));

  const options: ExportOptions = {
    filename: `audience-${new Date().toISOString().split('T')[0]}.${format}`,
    sheetName: 'Audience',
    format,
  };

  return exportData(data, options);
};

export const exportCreativeData = (creatives: any[], format: 'csv' | 'xlsx' | 'pdf' = 'csv') => {
  // Generate sample creative data if no creatives provided
  const sampleCreatives = creatives && creatives.length > 0 ? creatives : [
    {
      name: 'Summer Collection Banner',
      type: 'image',
      platform: 'Facebook',
      status: 'active',
      impressions: 250000,
      clicks: 8500,
      ctr: '3.4%',
      engagementRate: '5.2%',
      performanceScore: 87,
      createdAt: '2024-01-15'
    },
    {
      name: 'Product Demo Video',
      type: 'video',
      platform: 'Instagram',
      status: 'active',
      impressions: 180000,
      clicks: 7200,
      ctr: '4.0%',
      engagementRate: '6.8%',
      performanceScore: 92,
      createdAt: '2024-01-12'
    },
    {
      name: 'Holiday Carousel Ad',
      type: 'carousel',
      platform: 'Facebook',
      status: 'paused',
      impressions: 120000,
      clicks: 3800,
      ctr: '3.2%',
      engagementRate: '4.5%',
      performanceScore: 76,
      createdAt: '2024-01-10'
    },
    {
      name: 'Brand Story Video',
      type: 'video',
      platform: 'LinkedIn',
      status: 'active',
      impressions: 95000,
      clicks: 2800,
      ctr: '2.9%',
      engagementRate: '5.1%',
      performanceScore: 84,
      createdAt: '2024-01-08'
    },
    {
      name: 'Product Showcase Image',
      type: 'image',
      platform: 'Google Ads',
      status: 'active',
      impressions: 320000,
      clicks: 9600,
      ctr: '3.0%',
      engagementRate: '4.8%',
      performanceScore: 79,
      createdAt: '2024-01-05'
    }
  ];

  const data = sampleCreatives.map(creative => ({
    'Creative Name': creative.name,
    'Type': creative.type,
    'Platform': creative.platform,
    'Status': creative.status,
    'Impressions': creative.impressions,
    'Clicks': creative.clicks,
    'CTR': creative.ctr,
    'Engagement Rate': creative.engagementRate,
    'Performance Score': creative.performanceScore,
    'Created Date': creative.createdAt,
  }));

  const options: ExportOptions = {
    filename: `creatives-${new Date().toISOString().split('T')[0]}.${format}`,
    sheetName: 'Creatives',
    format,
  };

  return exportData(data, options);
};

export const exportConversionData = (conversionData: any[], format: 'csv' | 'xlsx' | 'pdf' = 'csv') => {
  // Generate sample conversion data if no data provided
  const sampleConversionData = conversionData && conversionData.length > 0 ? conversionData : [
    {
      date: '2024-01-01',
      conversions: 285,
      revenue: 28500,
      conversionRate: '3.2%',
      channel: 'Google Ads',
      campaign: 'Summer Sale 2024',
      costPerConversion: 45.20
    },
    {
      date: '2024-01-02',
      conversions: 320,
      revenue: 32000,
      conversionRate: '3.8%',
      channel: 'Facebook Ads',
      campaign: 'Brand Awareness Q4',
      costPerConversion: 42.10
    },
    {
      date: '2024-01-03',
      conversions: 265,
      revenue: 26500,
      conversionRate: '2.9%',
      channel: 'LinkedIn Ads',
      campaign: 'Product Launch',
      costPerConversion: 48.50
    },
    {
      date: '2024-01-04',
      conversions: 380,
      revenue: 38000,
      conversionRate: '4.2%',
      channel: 'Email Marketing',
      campaign: 'Retargeting Campaign',
      costPerConversion: 38.90
    },
    {
      date: '2024-01-05',
      conversions: 295,
      revenue: 29500,
      conversionRate: '3.1%',
      channel: 'Instagram Ads',
      campaign: 'Holiday Campaign',
      costPerConversion: 44.20
    }
  ];

  const data = sampleConversionData.map(item => ({
    'Date': item.date,
    'Conversions': item.conversions,
    'Revenue': item.revenue,
    'Conversion Rate': item.conversionRate,
    'Channel': item.channel,
    'Campaign': item.campaign,
    'Cost per Conversion': item.costPerConversion,
  }));

  const options: ExportOptions = {
    filename: `conversions-${new Date().toISOString().split('T')[0]}.${format}`,
    sheetName: 'Conversions',
    format,
  };

  return exportData(data, options);
};

export const exportOverviewData = (overviewData: any, format: 'csv' | 'xlsx' | 'pdf' = 'csv') => {
  const data = [
    {
      'Metric': 'Total Revenue',
      'Value': overviewData.totalRevenue,
      'Period': 'All Time',
    },
    {
      'Metric': 'Total Spend',
      'Value': overviewData.totalSpend,
      'Period': 'All Time',
    },
    {
      'Metric': 'Total Conversions',
      'Value': overviewData.totalConversions,
      'Period': 'All Time',
    },
    {
      'Metric': 'ROAS',
      'Value': overviewData.roas,
      'Period': 'All Time',
    },
    {
      'Metric': 'Active Campaigns',
      'Value': overviewData.activeCampaigns,
      'Period': 'Current',
    },
    {
      'Metric': 'Impressions',
      'Value': overviewData.impressions,
      'Period': 'All Time',
    },
    {
      'Metric': 'Clicks',
      'Value': overviewData.clicks,
      'Period': 'All Time',
    },
    {
      'Metric': 'CTR',
      'Value': overviewData.ctr,
      'Period': 'All Time',
    },
  ];

  const options: ExportOptions = {
    filename: `overview-${new Date().toISOString().split('T')[0]}.${format}`,
    sheetName: 'Overview',
    format,
  };

  return exportData(data, options);
}; 