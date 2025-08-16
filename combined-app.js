// Combined application state and data for both dashboards
let appState = {
    activeTab: 'ecosystem',
    // Forecast tab state
    selectedRetailers: new Set(),
    dateWindow: '2025-ytd',
    useSeasonality: true,
    campaigns: [],
    baselineForecast: {},
    totalForecast: {},
    charts: {}
};

// Ecosystem Dashboard Data
const ecosystemData = {
    traffic_data: {
        ApoDiscounter: {total_revenue: 971, revenue_share: 4.0, channels: {"AI Engines": 0, "Direct": 219, "Organic Search": 327, "Paid Search": 425, "Paid Social": 0, "Referral": 0}},
        DocMorris: {total_revenue: 2562, revenue_share: 12.0, channels: {"AI Engines": 63, "Direct": 353, "Organic Search": 1286, "Paid Search": 803, "Paid Social": 0, "Referral": 27}},
        Flaconi: {total_revenue: 563, revenue_share: 3.0, channels: {"AI Engines": 0, "Direct": 175, "Organic Search": 246, "Paid Search": 142, "Paid Social": 0, "Referral": 0}},
        MPK: {total_revenue: 0, revenue_share: 0.0, channels: {}},
        MedPex: {total_revenue: 1680, revenue_share: 8.0, channels: {"AI Engines": 0, "Direct": 360, "Organic Search": 674, "Paid Search": 646, "Paid Social": 0, "Referral": 0}},
        Sanicare: {total_revenue: 819, revenue_share: 4.0, channels: {"AI Engines": 0, "Direct": 274, "Organic Search": 290, "Paid Search": 255, "Paid Social": 0, "Referral": 0}},
        "Shop Apotheke": {total_revenue: 15080, revenue_share: 70.0, channels: {"AI Engines": 30, "Direct": 3194, "Organic Search": 6079, "Paid Search": 5184, "Paid Social": 455, "Referral": 138}},
        Zalando: {total_revenue: 0, revenue_share: 0.0, channels: {}}
    },
    retailer_details: {
        "Shop Apotheke": {sell_in_target: 1050000, actual_sell_in: 578038, completion: 55, total_sell_out: 847682, web_traffic_revenue: 15080, retail_ad_revenue: 2214, retail_ad_cost: 30964, retail_ad_roas: 0.07, unknown_sources: 830388},
        DocMorris: {sell_in_target: 400000, actual_sell_in: 166317, completion: 42, total_sell_out: 289170, web_traffic_revenue: 2562, retail_ad_revenue: 0, retail_ad_cost: 40376, retail_ad_roas: 0.00, unknown_sources: 286608},
        MedPex: {sell_in_target: 80000, actual_sell_in: 0, completion: 0, total_sell_out: 249300, web_traffic_revenue: 1680, retail_ad_revenue: 0, retail_ad_cost: 0, retail_ad_roas: 0.00, unknown_sources: 247620},
        ApoDiscounter: {sell_in_target: 610000, actual_sell_in: 192686, completion: 32, total_sell_out: 293756, web_traffic_revenue: 971, retail_ad_revenue: 12345, retail_ad_cost: 21438, retail_ad_roas: 0.58, unknown_sources: 280440},
        TNA: {sell_in_target: 60000, actual_sell_in: 42774, completion: 71, total_sell_out: 119610, web_traffic_revenue: 0, retail_ad_revenue: 0, retail_ad_cost: 0, retail_ad_roas: 0.00, unknown_sources: 119610},
        Sanicare: {sell_in_target: 30000, actual_sell_in: 7416, completion: 25, total_sell_out: 819, web_traffic_revenue: 819, retail_ad_revenue: 0, retail_ad_cost: 0, retail_ad_roas: 0.00, unknown_sources: 0},
        MPK: {sell_in_target: 250000, actual_sell_in: 57386, completion: 23, total_sell_out: 140790, web_traffic_revenue: 0, retail_ad_revenue: 0, retail_ad_cost: 0, retail_ad_roas: 0.00, unknown_sources: 140790},
        Flaconi: {sell_in_target: 240000, actual_sell_in: 147638, completion: 62, total_sell_out: 15470, web_traffic_revenue: 563, retail_ad_revenue: 14907, retail_ad_cost: 7483, retail_ad_roas: 1.99, unknown_sources: 0},
        Zalando: {sell_in_target: 200000, actual_sell_in: 0, completion: 0, total_sell_out: 183288, web_traffic_revenue: 0, retail_ad_revenue: 0, retail_ad_cost: 0, retail_ad_roas: 0.00, unknown_sources: 183288}
    },
    totals: {
        total_web_revenue: 43350,
        total_sellout_revenue: 2123596,
        total_market_share: 42
    }
};

// Forecast Dashboard Data
const forecastData = {
    trafficRevenue: [
        {"retailer": "Shop Apotheke", "total_revenue": 15080, "paid_search": 5184, "paid_social": 455, "organic_search": 6079, "direct": 3194, "ai_engines": 30, "referral": 138},
        {"retailer": "DocMorris", "total_revenue": 2562, "paid_search": 803, "paid_social": 0, "organic_search": 1286, "direct": 353, "ai_engines": 63, "referral": 27},
        {"retailer": "MedPex", "total_revenue": 1680, "paid_search": 646, "paid_social": 0, "organic_search": 674, "direct": 360, "ai_engines": 0, "referral": 0},
        {"retailer": "ApoDiscounter", "total_revenue": 971, "paid_search": 425, "paid_social": 0, "organic_search": 327, "direct": 219, "ai_engines": 0, "referral": 0},
        {"retailer": "Sanicare", "total_revenue": 819, "paid_search": 255, "paid_social": 0, "organic_search": 290, "direct": 274, "ai_engines": 0, "referral": 0},
        {"retailer": "Flaconi", "total_revenue": 563, "paid_search": 142, "paid_social": 0, "organic_search": 246, "direct": 175, "ai_engines": 0, "referral": 0}
    ],
    retailerTargets2026: [
        {"retailer": "Shop Apotheke", "target": 1200000, "ytd_2025": 578038, "baseline_2026": 1134000, "gap": -66000, "completion": 94.5},
        {"retailer": "DocMorris", "target": 300000, "ytd_2025": 166317, "baseline_2026": 280000, "gap": -20000, "completion": 93.3},
        {"retailer": "MedPex", "target": 50000, "ytd_2025": 0, "baseline_2026": 40000, "gap": -10000, "completion": 80.0},
        {"retailer": "ApoDiscounter", "target": 425000, "ytd_2025": 192686, "baseline_2026": 380000, "gap": -45000, "completion": 89.4},
        {"retailer": "TNA", "target": 80000, "ytd_2025": 42774, "baseline_2026": 75000, "gap": -5000, "completion": 93.8},
        {"retailer": "Sanicare", "target": 20000, "ytd_2025": 7416, "baseline_2026": 18000, "gap": -2000, "completion": 90.0},
        {"retailer": "MPK", "target": 150000, "ytd_2025": 57386, "baseline_2026": 140000, "gap": -10000, "completion": 93.3},
        {"retailer": "Flaconi", "target": 300000, "ytd_2025": 147638, "baseline_2026": 290000, "gap": -10000, "completion": 96.7},
        {"retailer": "Zalando", "target": 150000, "ytd_2025": 0, "baseline_2026": 120000, "gap": -30000, "completion": 80.0}
    ],
    monthlyTrends: {
        "baseline": [2100, 2150, 2200, 2300, 2400, 2350, 2250, 2200, 2300, 2400, 2500, 2600],
        "with_campaigns": [2100, 2250, 2400, 2600, 2800, 2750, 2650, 2600, 2750, 2900, 3100, 3300],
        "target": [2200, 2200, 2200, 2200, 2200, 2200, 2200, 2200, 2200, 2200, 2200, 2200]
    },
    seasonalityData: [1.05, 0.98, 1.02, 1.08, 1.12, 1.15, 0.95, 0.92, 1.05, 1.18, 1.25, 1.35]
};

// Chart colors for consistency
const CHART_COLORS = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Utility functions
function formatNumber(num) {
    if (num === 0 || num == null) return '0';
    if (num < 1000) return Math.round(num).toString();
    if (num < 1000000) return `${(num / 1000).toFixed(0)}K`;
    return `${(num / 1000000).toFixed(1)}M`;
}

function formatCurrency(num) {
    if (num === 0 || num == null) return '€0';
    if (num < 1000) return `€${Math.round(num)}`;
    if (num < 1000000) return `€${(num / 1000).toFixed(0)}K`;
    return `€${(num / 1000000).toFixed(1)}M`;
}

function formatPercentage(num) {
    if (num == null) return '0.0%';
    return `${num.toFixed(1)}%`;
}

function getYoYIcon(change) {
    return change >= 0 ? '▲' : '▼';
}

function getYoYClass(change) {
    return change >= 0 ? 'positive' : 'negative';
}

// Tab Management
function switchTab(tabName) {
    console.log('Switching to tab:', tabName);
    
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Show selected tab content and activate button
    const targetTab = document.getElementById(`${tabName}-tab`);
    const targetButton = document.getElementById(`tab-${tabName}`);
    
    if (targetTab && targetButton) {
        targetTab.classList.add('active');
        targetButton.classList.add('active');
        appState.activeTab = tabName;

        // Initialize tab-specific content
        if (tabName === 'ecosystem') {
            setTimeout(() => initializeEcosystem(), 100);
        } else if (tabName === 'forecast') {
            setTimeout(() => initializeForecast(), 100);
        }
    } else {
        console.error('Tab elements not found:', `${tabName}-tab`, `tab-${tabName}`);
    }
}

// === ECOSYSTEM DASHBOARD FUNCTIONS ===
let svg, g, simulation, zoom;
let nodes = [], links = [];
let selectedNode = null;
let tooltip, rightPanel;

function initializeEcosystem() {
    console.log('Initializing Ecosystem Dashboard...');
    const container = d3.select('#network-graph');
    const containerNode = container.node();
    
    if (!containerNode) {
        console.error('Network graph container not found');
        return;
    }

    const rect = containerNode.getBoundingClientRect();
    svg = container
        .attr('width', rect.width)
        .attr('height', rect.height);

    g = svg.append('g');

    // Add zoom behavior
    zoom = d3.zoom()
        .scaleExtent([0.3, 3.0])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        });

    svg.call(zoom);

    // Initialize tooltip and panel
    tooltip = d3.select('#tooltip');
    rightPanel = d3.select('#right-panel');

    // Create and render network data
    createNetworkData();
    renderNetwork();
}

function createNetworkData() {
    nodes = [];
    links = [];

    // Calculate totals for shares
    const totalChannelRevenue = Object.values(ecosystemData.traffic_data).reduce((sum, retailer) => 
        sum + Object.values(retailer.channels).reduce((channelSum, val) => channelSum + val, 0), 0);

    // Column 1: Channel Groups
    const channelGroups = [
        {
            id: 'paid_social', name: 'Paid Social', level: 1, column: 1, expanded: false, hasChildren: true,
            children: [
                {id: 'meta_ads', name: 'Meta Ads', level: 1.5, column: 1, parent: 'paid_social'},
                {id: 'tiktok_ads', name: 'TikTok Ads', level: 1.5, column: 1, parent: 'paid_social'},
                {id: 'youtube_ads', name: 'YouTube Ads', level: 1.5, column: 1, parent: 'paid_social'}
            ]
        },
        {
            id: 'organic_search', name: 'Organic Search', level: 1, column: 1, expanded: false, hasChildren: true,
            children: [
                {id: 'google_organic', name: 'Google', level: 1.5, column: 1, parent: 'organic_search'}
            ]
        },
        {
            id: 'paid_search', name: 'Paid Search', level: 1, column: 1, expanded: false, hasChildren: true,
            children: [
                {id: 'google_paid', name: 'Google', level: 1.5, column: 1, parent: 'paid_search'}
            ]
        },
        {id: 'direct', name: 'Direct', level: 1, column: 1, expanded: false, hasChildren: false},
        {id: 'referral', name: 'Referral', level: 1, column: 1, expanded: false, hasChildren: false},
        {id: 'ai_engines', name: 'AI Engines', level: 1, column: 1, expanded: false, hasChildren: false}
    ];

    // Calculate channel metrics
    channelGroups.forEach(channel => {
        let totalRevenue = 0;
        Object.values(ecosystemData.traffic_data).forEach(retailer => {
            switch(channel.id) {
                case 'paid_social':
                    totalRevenue += retailer.channels['Paid Social'] || 0;
                    break;
                case 'organic_search':
                    totalRevenue += retailer.channels['Organic Search'] || 0;
                    break;
                case 'paid_search':
                    totalRevenue += retailer.channels['Paid Search'] || 0;
                    break;
                case 'direct':
                    totalRevenue += retailer.channels['Direct'] || 0;
                    break;
                case 'referral':
                    totalRevenue += retailer.channels['Referral'] || 0;
                    break;
                case 'ai_engines':
                    totalRevenue += retailer.channels['AI Engines'] || 0;
                    break;
            }
        });

        channel.revenue = totalRevenue;
        channel.clicks = totalRevenue;
        channel.trafficShare = totalChannelRevenue > 0 ? (totalRevenue / totalChannelRevenue * 100) : 0;
        channel.revenueShare = totalChannelRevenue > 0 ? (totalRevenue / totalChannelRevenue * 100) : 0;
        channel.yoyTraffic = (Math.random() - 0.5) * 30;
        channel.yoyRevenue = (Math.random() - 0.5) * 30;

        // Calculate child metrics
        if (channel.children) {
            channel.children.forEach(child => {
                child.revenue = Math.floor(totalRevenue * (0.3 + Math.random() * 0.4));
                child.clicks = Math.floor(totalRevenue * (0.3 + Math.random() * 0.4));
                child.trafficShare = 100;
                child.revenueShare = 100;
                child.yoyTraffic = (Math.random() - 0.5) * 30;
                child.yoyRevenue = (Math.random() - 0.5) * 30;
            });
        }
    });

    // Column 2: BIODERMA Web
    const biodermaWeb = {
        id: 'bioderma_web',
        name: 'BIODERMA Web',
        level: 2,
        column: 2,
        expanded: false,
        hasChildren: true,
        revenue: ecosystemData.totals.total_web_revenue,
        clicks: Object.values(ecosystemData.traffic_data).reduce((sum, r) => sum + r.total_revenue, 0),
        trafficShare: 100,
        revenueShare: 100,
        yoyTraffic: 8.5,
        yoyRevenue: 12.3,
        children: [
            {id: 'pharmacies', name: 'Pharmacies', level: 2.5, column: 3, parent: 'bioderma_web'},
            {id: 'unofficial_retailers', name: 'Unofficial e‑Retailers', level: 2.5, column: 3, parent: 'bioderma_web'},
            {id: 'official_retailers', name: 'Official e‑Retailers', level: 2.5, column: 3, parent: 'bioderma_web', hasChildren: true, expanded: false}
        ]
    };

    // Column 3: Official e‑Retailers
    const officialRetailers = [
        {id: 'shop_apotheke', name: 'Shop Apotheke', level: 3, column: 3, parent: 'official_retailers', isRetailer: true},
        {id: 'docmorris', name: 'DocMorris', level: 3, column: 3, parent: 'official_retailers', isRetailer: true},
        {id: 'medpex', name: 'MedPex', level: 3, column: 3, parent: 'official_retailers', isRetailer: true},
        {id: 'apodiscounter', name: 'ApoDiscounter', level: 3, column: 3, parent: 'official_retailers', isRetailer: true},
        {id: 'flaconi', name: 'Flaconi', level: 3, column: 3, parent: 'official_retailers', isRetailer: true},
        {id: 'sanicare', name: 'Sanicare', level: 3, column: 3, parent: 'official_retailers', isRetailer: true}
    ];

    // Calculate retailer metrics
    const totalRetailerRevenue = Object.values(ecosystemData.traffic_data).reduce((sum, r) => sum + r.total_revenue, 0);
    officialRetailers.forEach(retailer => {
        const retailerName = retailer.name;
        const data = ecosystemData.traffic_data[retailerName] || ecosystemData.retailer_details[retailerName];
        
        if (data) {
            retailer.revenue = data.total_revenue || data.total_sell_out || 0;
            retailer.clicks = data.web_traffic_revenue || Math.floor(retailer.revenue * 0.02);
            retailer.trafficShare = totalRetailerRevenue > 0 ? (retailer.revenue / totalRetailerRevenue * 100) : 0;
            retailer.revenueShare = totalRetailerRevenue > 0 ? (retailer.revenue / totalRetailerRevenue * 100) : 0;
            retailer.yoyTraffic = (Math.random() - 0.3) * 40;
            retailer.yoyRevenue = (Math.random() - 0.2) * 35;
        } else {
            retailer.revenue = 0;
            retailer.clicks = 0;
            retailer.trafficShare = 0;
            retailer.revenueShare = 0;
            retailer.yoyTraffic = 0;
            retailer.yoyRevenue = 0;
        }
    });

    // Add nodes
    channelGroups.forEach(channel => nodes.push(channel));
    nodes.push(biodermaWeb);
    biodermaWeb.children.forEach(child => nodes.push(child));
    officialRetailers.forEach(retailer => nodes.push(retailer));

    // Store children references
    const officialRetailersNode = nodes.find(n => n.id === 'official_retailers');
    if (officialRetailersNode) {
        officialRetailersNode.children = officialRetailers;
    }

    // Create links
    channelGroups.forEach(channel => {
        links.push({
            source: channel.id,
            target: 'bioderma_web',
            type: 'channel-to-web'
        });
    });

    biodermaWeb.children.forEach(child => {
        links.push({
            source: 'bioderma_web',
            target: child.id,
            type: 'web-to-category'
        });
    });

    officialRetailers.forEach(retailer => {
        links.push({
            source: 'official_retailers',
            target: retailer.id,
            type: 'category-to-retailer'
        });
    });
}

function renderNetwork() {
    if (!svg) return;
    
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    // Clear existing content
    g.selectAll('*').remove();

    // Filter visible nodes
    const visibleNodes = nodes.filter(node => {
        if (node.level === 1.5) {
            const parent = nodes.find(n => n.id === node.parent);
            return parent && parent.expanded;
        }
        return true;
    });

    // Filter visible links
    const visibleLinks = links.filter(link => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        const sourceNode = visibleNodes.find(n => n.id === sourceId);
        const targetNode = visibleNodes.find(n => n.id === targetId);
        return sourceNode && targetNode;
    });

    // Position nodes in columns
    const columnWidth = width / 3;
    visibleNodes.forEach(node => {
        if (!node.x || !node.y) {
            if (node.column === 1) {
                node.x = columnWidth * 0.5;
            } else if (node.column === 2) {
                node.x = columnWidth * 1.5;
            } else if (node.column === 3) {
                node.x = columnWidth * 2.5;
            }

            const nodesInColumn = visibleNodes.filter(n => n.column === node.column);
            const nodeIndex = nodesInColumn.indexOf(node);
            const spacing = (height * 0.8) / Math.max(nodesInColumn.length, 1);
            node.y = (height * 0.1) + (nodeIndex * spacing) + (spacing / 2);
        }
    });

    // Render links
    const link = g.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(visibleLinks)
        .enter().append('line')
        .attr('class', 'link')
        .attr('x1', d => {
            const sourceNode = visibleNodes.find(n => n.id === (typeof d.source === 'object' ? d.source.id : d.source));
            return sourceNode ? sourceNode.x : 0;
        })
        .attr('y1', d => {
            const sourceNode = visibleNodes.find(n => n.id === (typeof d.source === 'object' ? d.source.id : d.source));
            return sourceNode ? sourceNode.y : 0;
        })
        .attr('x2', d => {
            const targetNode = visibleNodes.find(n => n.id === (typeof d.target === 'object' ? d.target.id : d.target));
            return targetNode ? targetNode.x : 0;
        })
        .attr('y2', d => {
            const targetNode = visibleNodes.find(n => n.id === (typeof d.target === 'object' ? d.target.id : d.target));
            return targetNode ? targetNode.y : 0;
        });

    // Render nodes
    const node = g.append('g')
        .attr('class', 'nodes')
        .selectAll('g')
        .data(visibleNodes)
        .enter().append('g')
        .attr('class', d => `node level-${Math.floor(d.level)}`)
        .attr('transform', d => `translate(${d.x},${d.y})`)
        .style('cursor', 'pointer')
        .on('click', handleNodeClick)
        .on('mouseover', showTooltip)
        .on('mouseout', hideTooltip);

    // Add circles
    node.append('circle')
        .attr('r', d => getNodeRadius(d))
        .style('pointer-events', 'none');

    // Add expand/collapse buttons
    node.filter(d => d.hasChildren)
        .append('g')
        .attr('class', 'expand-button-group')
        .style('cursor', 'pointer')
        .on('click', handleExpandClick)
        .each(function(d) {
            const group = d3.select(this);
            group.append('circle')
                .attr('class', 'expand-bg')
                .attr('cx', 30)
                .attr('cy', 0)
                .attr('r', 12);
            
            group.append('text')
                .attr('class', 'expand-text')
                .attr('x', 30)
                .attr('y', 0)
                .attr('dy', '0.35em')
                .text(d.expanded ? '−' : '+');
        });

    // Add labels
    node.append('text')
        .attr('class', 'node-label')
        .attr('y', d => -getNodeRadius(d) - 8)
        .text(d => d.name)
        .style('pointer-events', 'none');

    // Add KPIs
    addNodeKPIs(node);
}

function getNodeRadius(d) {
    const revenue = d.revenue || 0;
    return Math.max(30, Math.min(50, Math.sqrt(revenue / 1000) + 25));
}

function addNodeKPIs(nodeSelection) {
    const kpiGroups = nodeSelection.append('g').attr('class', 'kpi-group');

    // Revenue
    kpiGroups.append('text')
        .attr('class', 'node-kpi')
        .attr('y', -10)
        .text(d => formatCurrency(d.revenue))
        .style('pointer-events', 'none');

    // Clicks
    kpiGroups.append('text')
        .attr('class', 'node-kpi')
        .attr('y', 0)
        .text(d => `${formatNumber(d.clicks)}`)
        .style('pointer-events', 'none');

    // Shares
    kpiGroups.append('text')
        .attr('class', 'node-kpi')
        .attr('y', 10)
        .text(d => `T:${formatPercentage(d.trafficShare)} R:${formatPercentage(d.revenueShare)}`)
        .style('pointer-events', 'none');

    // YoY changes
    kpiGroups.append('text')
        .attr('class', d => `node-kpi yoy-${getYoYClass(d.yoyTraffic)}`)
        .attr('y', 20)
        .text(d => `${getYoYIcon(d.yoyTraffic)}${formatPercentage(Math.abs(d.yoyTraffic))}`)
        .style('pointer-events', 'none');
}

function handleNodeClick(event, d) {
    event.stopPropagation();
    
    if (selectedNode === d) {
        selectedNode = null;
        d3.selectAll('.node').classed('selected', false);
        if (rightPanel) rightPanel.classed('open', false);
    } else {
        selectedNode = d;
        d3.selectAll('.node').classed('selected', false);
        d3.select(event.currentTarget).classed('selected', true);
        showNodeDetails(d);
    }
}

function handleExpandClick(event, d) {
    event.stopPropagation();
    d.expanded = !d.expanded;

    if (d.expanded) {
        if (d.children) {
            d.children.forEach(child => {
                if (!nodes.find(n => n.id === child.id)) {
                    nodes.push(child);
                    links.push({
                        source: d.id,
                        target: child.id,
                        type: 'parent-child'
                    });
                }
            });
        }
    } else {
        if (d.children) {
            d.children.forEach(child => {
                const childIndex = nodes.findIndex(n => n.id === child.id);
                if (childIndex !== -1) {
                    nodes.splice(childIndex, 1);
                }
                
                for (let i = links.length - 1; i >= 0; i--) {
                    const link = links[i];
                    const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
                    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
                    if (sourceId === child.id || targetId === child.id) {
                        links.splice(i, 1);
                    }
                }
            });
        }
    }

    renderNetwork();
}

function showTooltip(event, d) {
    if (!tooltip) return;
    
    const tooltipContent = createTooltipContent(d);
    tooltip
        .html(tooltipContent)
        .classed('visible', true)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 10) + 'px');
}

function hideTooltip() {
    if (tooltip) tooltip.classed('visible', false);
}

function createTooltipContent(d) {
    return `
        <h4>${d.name}</h4>
        <div class="tooltip-row">
            <span class="tooltip-label">Revenue:</span>
            <span class="tooltip-value">${formatCurrency(d.revenue)}</span>
        </div>
        <div class="tooltip-row">
            <span class="tooltip-label">Traffic Share:</span>
            <span class="tooltip-value">${formatPercentage(d.trafficShare)}</span>
        </div>
        <div class="tooltip-row">
            <span class="tooltip-label">YoY Growth:</span>
            <span class="tooltip-value yoy-change ${getYoYClass(d.yoyRevenue)}">
                <span class="yoy-icon">${getYoYIcon(d.yoyRevenue)}</span>
                ${formatPercentage(Math.abs(d.yoyRevenue))}
            </span>
        </div>
    `;
}

function showNodeDetails(d) {
    if (!rightPanel) return;

    const panelContent = document.getElementById('panel-content');
    if (!panelContent) return;

    panelContent.innerHTML = `
        <div class="metric-cards">
            <div class="metric-card">
                <h4>Revenue</h4>
                <p class="value">${formatCurrency(d.revenue)}</p>
                <p class="change ${getYoYClass(d.yoyRevenue)}">${getYoYIcon(d.yoyRevenue)} ${formatPercentage(Math.abs(d.yoyRevenue))}</p>
            </div>
            <div class="metric-card">
                <h4>Traffic Share</h4>
                <p class="value">${formatPercentage(d.trafficShare)}</p>
                <p class="change ${getYoYClass(d.yoyTraffic)}">${getYoYIcon(d.yoyTraffic)} ${formatPercentage(Math.abs(d.yoyTraffic))}</p>
            </div>
        </div>
        
        <div class="section">
            <h4>Performance Breakdown</h4>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Value</th>
                        <th>YoY Change</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Revenue</td>
                        <td>${formatCurrency(d.revenue)}</td>
                        <td class="${getYoYClass(d.yoyRevenue)}">${getYoYIcon(d.yoyRevenue)} ${formatPercentage(Math.abs(d.yoyRevenue))}</td>
                    </tr>
                    <tr>
                        <td>Traffic</td>
                        <td>${formatNumber(d.clicks)}</td>
                        <td class="${getYoYClass(d.yoyTraffic)}">${getYoYIcon(d.yoyTraffic)} ${formatPercentage(Math.abs(d.yoyTraffic))}</td>
                    </tr>
                    <tr>
                        <td>Traffic Share</td>
                        <td>${formatPercentage(d.trafficShare)}</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Revenue Share</td>
                        <td>${formatPercentage(d.revenueShare)}</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    rightPanel.classed('open', true);
}

function closeRightPanel() {
    if (rightPanel) rightPanel.classed('open', false);
    selectedNode = null;
    d3.selectAll('.node').classed('selected', false);
}

// === FORECAST DASHBOARD FUNCTIONS ===
function initializeForecast() {
    console.log('Initializing Forecast Dashboard...');
    
    // Initialize forecast components
    initializeRetailerFilter();
    initializeTargetList();
    updateBaselineMetrics();
    renderMonthlyTrendChart();
    renderSeasonalityChart();
    renderBaselineTable();
    renderRetailerGrid();
    updateCampaignList();
}

function initializeRetailerFilter() {
    const container = document.getElementById('retailer-filter');
    if (!container) return;

    container.innerHTML = '';
    forecastData.retailerTargets2026.forEach(retailer => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="checkbox" value="${retailer.retailer}" onchange="toggleRetailer('${retailer.retailer}', this.checked)">
            ${retailer.retailer}
        `;
        container.appendChild(label);
    });
}

function initializeTargetList() {
    const container = document.getElementById('target-list');
    if (!container) return;

    container.innerHTML = '';
    forecastData.retailerTargets2026.forEach(retailer => {
        const item = document.createElement('div');
        item.className = 'target-item';
        item.innerHTML = `
            <span class="target-retailer">${retailer.retailer}</span>
            <span class="target-value">${formatCurrency(retailer.target)}</span>
        `;
        container.appendChild(item);
    });
}

function updateBaselineMetrics() {
    const totalSellOut = forecastData.retailerTargets2026.reduce((sum, r) => sum + r.ytd_2025, 0);
    const totalBaseline = forecastData.retailerTargets2026.reduce((sum, r) => sum + r.baseline_2026, 0);
    const totalTarget = forecastData.retailerTargets2026.reduce((sum, r) => sum + r.target, 0);
    const totalGap = totalTarget - totalBaseline;
    const gapPercentage = totalTarget > 0 ? (totalGap / totalTarget * 100) : 0;

    const elements = {
        'sellout-ytd': formatCurrency(totalSellOut),
        'annualized': formatCurrency(totalSellOut * 1.5),
        'baseline-forecast': formatCurrency(totalBaseline),
        'sellin-required': formatCurrency(totalTarget),
        'gap-to-target': `${formatCurrency(Math.abs(totalGap))} (${Math.abs(gapPercentage).toFixed(1)}%)`
    };

    Object.keys(elements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = elements[id];
        }
    });
}

function renderMonthlyTrendChart() {
    const canvas = document.getElementById('monthly-trend-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Baseline',
                    data: forecastData.monthlyTrends.baseline,
                    borderColor: CHART_COLORS[0],
                    backgroundColor: CHART_COLORS[0] + '20',
                    tension: 0.4
                },
                {
                    label: 'With Campaigns',
                    data: forecastData.monthlyTrends.with_campaigns,
                    borderColor: CHART_COLORS[1],
                    backgroundColor: CHART_COLORS[1] + '20',
                    tension: 0.4
                },
                {
                    label: 'Target',
                    data: forecastData.monthlyTrends.target,
                    borderColor: CHART_COLORS[2],
                    backgroundColor: CHART_COLORS[2] + '20',
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatNumber(value);
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
}

function renderSeasonalityChart() {
    const canvas = document.getElementById('seasonality-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Seasonality Index',
                data: forecastData.seasonalityData,
                backgroundColor: CHART_COLORS.map((color, index) => color + '80'),
                borderColor: CHART_COLORS,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(2);
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function renderBaselineTable() {
    const tbody = document.getElementById('baseline-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';
    forecastData.retailerTargets2026.forEach(retailer => {
        const row = document.createElement('tr');
        const str = 0.6; // Mock STR value
        const annualized = retailer.ytd_2025 * 1.5;
        const sellInRequired = retailer.target;
        const gapEuro = retailer.gap;
        const gapPercent = retailer.target > 0 ? (Math.abs(gapEuro) / retailer.target * 100) : 0;
        
        row.innerHTML = `
            <td>${retailer.retailer}</td>
            <td>${formatCurrency(retailer.ytd_2025)}</td>
            <td>${formatCurrency(annualized)}</td>
            <td>${formatCurrency(retailer.baseline_2026)}</td>
            <td>${str.toFixed(1)}</td>
            <td>${formatCurrency(sellInRequired)}</td>
            <td>${formatCurrency(retailer.target)}</td>
            <td class="${gapEuro < 0 ? 'text-error' : 'text-success'}">${formatCurrency(Math.abs(gapEuro))}</td>
            <td class="${gapEuro < 0 ? 'text-error' : 'text-success'}">${gapPercent.toFixed(1)}%</td>
        `;
        tbody.appendChild(row);
    });
}

function renderRetailerGrid() {
    const container = document.getElementById('retailer-grid');
    if (!container) return;

    container.innerHTML = '';
    forecastData.retailerTargets2026.forEach(retailer => {
        const completionClass = retailer.completion >= 95 ? 'high' : 
                               retailer.completion >= 85 ? 'medium' : 'low';
        
        const card = document.createElement('div');
        card.className = 'retailer-card';
        card.innerHTML = `
            <div class="retailer-card-header">
                <span class="retailer-name">${retailer.retailer}</span>
                <span class="completion-badge ${completionClass}">${retailer.completion.toFixed(1)}%</span>
            </div>
            <div class="retailer-metrics">
                <div class="retailer-metric">
                    <span class="retailer-metric-label">YTD 2025</span>
                    <span class="retailer-metric-value">${formatCurrency(retailer.ytd_2025)}</span>
                </div>
                <div class="retailer-metric">
                    <span class="retailer-metric-label">2026 Target</span>
                    <span class="retailer-metric-value">${formatCurrency(retailer.target)}</span>
                </div>
                <div class="retailer-metric">
                    <span class="retailer-metric-label">Baseline</span>
                    <span class="retailer-metric-value">${formatCurrency(retailer.baseline_2026)}</span>
                </div>
                <div class="retailer-metric">
                    <span class="retailer-metric-label">Gap</span>
                    <span class="retailer-metric-value ${retailer.gap < 0 ? 'text-error' : 'text-success'}">${formatCurrency(Math.abs(retailer.gap))}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function updateCampaignList() {
    const container = document.getElementById('campaign-list');
    if (!container) return;

    if (appState.campaigns.length === 0) {
        container.innerHTML = '<p class="text-center">No campaigns added yet. Click "Add to Forecast: Advertising Campaign" to get started.</p>';
        return;
    }

    container.innerHTML = '';
    appState.campaigns.forEach((campaign, index) => {
        const estimatedRevenue = campaign.budget * (campaign.roas || 1.5);
        
        const card = document.createElement('div');
        card.className = 'campaign-card slide-up';
        card.innerHTML = `
            <div class="campaign-header">
                <span class="campaign-title">${campaign.name}</span>
                <div class="campaign-actions-buttons">
                    <button class="btn btn--sm btn--secondary" onclick="editCampaign(${index})">Edit</button>
                    <button class="btn btn--sm btn--outline" onclick="removeCampaign(${index})">Remove</button>
                </div>
            </div>
            <div class="campaign-metrics">
                <div class="campaign-metric">
                    <div class="campaign-metric-label">Budget</div>
                    <div class="campaign-metric-value">${formatCurrency(campaign.budget)}</div>
                </div>
                <div class="campaign-metric">
                    <div class="campaign-metric-label">Est. Revenue</div>
                    <div class="campaign-metric-value">${formatCurrency(estimatedRevenue)}</div>
                </div>
                <div class="campaign-metric">
                    <div class="campaign-metric-label">ROAS</div>
                    <div class="campaign-metric-value">${(campaign.roas || 0).toFixed(2)}</div>
                </div>
                <div class="campaign-metric">
                    <div class="campaign-metric-label">Channel</div>
                    <div class="campaign-metric-value">${campaign.adType}</div>
                </div>
                <div class="campaign-metric">
                    <div class="campaign-metric-label">Domain</div>
                    <div class="campaign-metric-value">${campaign.domain}</div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Campaign Modal Functions
function showCampaignModal() {
    const modal = document.getElementById('campaign-modal');
    if (modal) modal.classList.remove('hidden');
}

function hideCampaignModal() {
    const modal = document.getElementById('campaign-modal');
    if (modal) modal.classList.add('hidden');
    
    // Reset form
    const form = modal.querySelector('form');
    if (form) form.reset();
}

function addCampaign() {
    const name = document.getElementById('campaign-name')?.value;
    const adType = document.getElementById('campaign-ad-type')?.value;
    const source = document.getElementById('campaign-source')?.value;
    const domain = document.getElementById('campaign-domain')?.value;
    const funnel = document.getElementById('campaign-funnel')?.value;
    const resultType = document.getElementById('campaign-result-type')?.value;
    const budget = parseFloat(document.getElementById('campaign-budget')?.value) || 0;
    const roas = parseFloat(document.getElementById('campaign-roas')?.value) || 0;
    const startMonth = document.getElementById('campaign-start-month')?.value;
    const endMonth = document.getElementById('campaign-end-month')?.value;

    if (!name || !adType || !source || !domain || !budget) {
        alert('Please fill in all required fields');
        return;
    }

    const campaign = {
        id: Date.now(),
        name,
        adType,
        source,
        domain,
        funnel,
        resultType,
        budget,
        roas,
        startMonth,
        endMonth
    };

    appState.campaigns.push(campaign);
    updateCampaignList();
    hideCampaignModal();
}

function removeCampaign(index) {
    if (confirm('Are you sure you want to remove this campaign?')) {
        appState.campaigns.splice(index, 1);
        updateCampaignList();
    }
}

function editCampaign(index) {
    // Implementation for editing campaigns
    console.log('Edit campaign', index);
}

// Utility functions for forecast tab
function toggleRetailer(retailer, checked) {
    if (checked) {
        appState.selectedRetailers.add(retailer);
    } else {
        appState.selectedRetailers.delete(retailer);
    }
    updateBaselineMetrics();
}

function updateDateWindow(value) {
    appState.dateWindow = value;
    updateBaselineMetrics();
    renderMonthlyTrendChart();
}

function toggleSeasonality(enabled) {
    appState.useSeasonality = enabled;
    renderSeasonalityChart();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set default active tab
    switchTab('ecosystem');
});