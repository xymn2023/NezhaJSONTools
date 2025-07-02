// 全局状态管理
const state = {
    theme: 'light',
    language: 'zh',
    config: {
        enableBilling: true,
        enablePlan: true,
        billingDataMod: {
            startDate: '',
            endDate: '',
            autoRenewal: '1',
            cycle: 'Year',
            amount: '200EUR'
        },
        planDataMod: {
            bandwidth: '30Mbps',
            trafficVol: '1TB/Month',
            trafficType: '2',
            IPv4: '1',
            IPv6: '1',
            networkRoute: '4837',
            extra: 'Einstein'
        }
    },
    tags: ['Einstein'],
    isManualRefresh: false
};

// 国际化字典
const i18n = {
    zh: {
        billingConfig: '账单配置',
        planConfig: '套餐配置',
        startDate: '起始日期',
        endDate: '结束日期',
        autoCalc: '自动计算',
        autoRenewal: '自动续费',
        billingCycle: '计费周期',
        english: '英文',
        amount: '金额',
        billing: '计费',
        free: '免费',
        payAsGo: '按量收费',
        bandwidth: '带宽',
        trafficVolume: '流量配额',
        trafficType: '流量类型',
        inbound: '入站',
        bidirectional: '双向',
        networkRoute: '网络路由',
        extraTags: '额外标签',
        jsonConfig: 'JSON 配置',
        refresh: '刷新',
        copy: '复制',
        warning: '警告',
        understand: '我知道了',
        copySuccess: '复制成功！',
        refreshSuccess: '从代码刷新成功！',
        unlimited: '无限制',
        day: '天',
        month: '月',
        quarter: '季',
        year: '年',
        cycles: {
            Day: '天',
            Week: '周',
            Month: '月',
            Quarter: '季',
            HalfYear: '半年',
            Year: '年',
            '2Year': '2年',
            '3Year': '3年',
            '4Year': '4年',
            '5Year': '5年',
            Permanent: '永久'
        },
        cyclesEn: {
            Day: 'Day',
            Week: 'Week',
            Month: 'Month',
            Quarter: 'Quarter',
            HalfYear: 'HalfYear',
            Year: 'Year',
            '2Year': '2Year',
            '3Year': '3Year',
            '4Year': '4Year',
            '5Year': '5Year',
            Permanent: 'Permanent'
        },
        trafficPeriods: {
            Day: '天',
            Month: '月',
            Quarter: '季',
            Year: '年',
            Unlimited: '无限'
        },
        trafficPeriodsEn: {
            Day: 'Day',
            Month: 'Month',
            Quarter: 'Quarter',
            Year: 'Year',
            Unlimited: 'Unlimited'
        },
        warningMessages: {
            unofficial: '您使用的{cycle}的计费周期，并不是官方支持的参数，无法自动刷新及计算规划中的账单统计报表，并禁用autoRenewal及cycle字段'
        }
    },
    en: {
        billingConfig: 'Billing Configuration',
        planConfig: 'Plan Configuration',
        startDate: 'Start Date',
        endDate: 'End Date',
        autoCalc: 'Auto Calculate',
        autoRenewal: 'Auto Renewal',
        billingCycle: 'Billing Cycle',
        english: 'English',
        amount: 'Amount',
        billing: 'Billing',
        free: 'Free',
        payAsGo: 'Pay as Go',
        bandwidth: 'Bandwidth',
        trafficVolume: 'Traffic Volume',
        trafficType: 'Traffic Type',
        inbound: 'Inbound',
        bidirectional: 'Bidirectional',
        networkRoute: 'Network Route',
        extraTags: 'Extra Tags',
        jsonConfig: 'JSON Configuration',
        refresh: 'Refresh',
        copy: 'Copy',
        warning: 'Warning',
        understand: 'I Understand',
        copySuccess: 'Copied Successfully!',
        refreshSuccess: 'Refreshed from code successfully!',
        unlimited: 'Unlimited',
        day: 'Day',
        month: 'Month',
        quarter: 'Quarter',
        year: 'Year',
        cycles: {
            Day: 'Day',
            Week: 'Week',
            Month: 'Month',
            Quarter: 'Quarter',
            HalfYear: 'HalfYear',
            Year: 'Year',
            '2Year': '2Year',
            '3Year': '3Year',
            '4Year': '4Year',
            '5Year': '5Year',
            Permanent: 'Permanent'
        },
        cyclesEn: {
            Day: 'Day',
            Week: 'Week',
            Month: 'Month',
            Quarter: 'Quarter',
            HalfYear: 'HalfYear',
            Year: 'Year',
            '2Year': '2Year',
            '3Year': '3Year',
            '4Year': '4Year',
            '5Year': '5Year',
            Permanent: 'Permanent'
        },
        trafficPeriods: {
            Day: 'Day',
            Month: 'Month',
            Quarter: 'Quarter',
            Year: 'Year',
            Unlimited: 'Unlimited'
        },
        trafficPeriodsEn: {
            Day: 'Day',
            Month: 'Month',
            Quarter: 'Quarter',
            Year: 'Year',
            Unlimited: 'Unlimited'
        },
        warningMessages: {
            unofficial: 'You are using {cycle} billing cycle, which is not officially supported and cannot auto-refresh or calculate planned billing statistics. AutoRenewal and cycle fields are disabled.'
        }
    }
};

// 货币符号映射
const currencySymbols = {
    CNY: '¥',
    USD: '$',
    EUR: '€',
    GBP: '£'
};

// 非官方周期列表
const unofficialCycles = ['Day', 'Week', '2Year', '3Year', '4Year', '5Year', 'Permanent'];

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // 设置初始日期
    const now = new Date();
    document.getElementById('startDate').value = formatDateTimeLocal(now);
    
    // 初始化主题
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // 初始化语言
    const savedLanguage = localStorage.getItem('language') || 'zh';
    setLanguage(savedLanguage);
    
    // 初始化配置
    updateBilling();
    updatePlan();
    
    // 更新JSON代码
    updateJsonCode();
}

// 主题切换
function toggleTheme() {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

function setTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    
    localStorage.setItem('theme', theme);
}

// 语言切换
function toggleLanguage() {
    const newLanguage = state.language === 'zh' ? 'en' : 'zh';
    setLanguage(newLanguage);
}

function setLanguage(language) {
    state.language = language;
    // 显示相反的语言名称作为切换提示
    document.getElementById('lang-indicator').textContent = language === 'zh' ? 'English' : '中文';
    
    // 更新所有文本
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (i18n[language][key]) {
            element.textContent = i18n[language][key];
        }
    });
    
    // 更新周期选项
    updateCycleOptions();
    updateTrafficPeriodOptions();
    updateCurrencyFormatOptions();
    
    localStorage.setItem('language', language);
    updateJsonCode();
}

function __(key, params = {}) {
    let text = i18n[state.language][key] || key;
    Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
    });
    return text;
}

// 节的开关
function toggleSection(section) {
    const checkbox = document.getElementById(`enable${section.charAt(0).toUpperCase() + section.slice(1)}`);
    const form = document.getElementById(`${section}Form`);
    
    if (section === 'billing') {
        state.config.enableBilling = checkbox.checked;
    } else if (section === 'plan') {
        state.config.enablePlan = checkbox.checked;
    }
    
    if (checkbox.checked) {
        form.classList.remove('hidden');
    } else {
        form.classList.add('hidden');
    }
    
    updateJsonCode();
}

// 自动结束日期切换
function triggerAutoCalculation() {
    calculateEndDate();
}

// 计算结束日期
function calculateEndDate() {
    const startDate = new Date(document.getElementById('startDate').value);
    const cycle = document.getElementById('cycle').value;
    let endDate = new Date(startDate);

    if (cycle === 'Permanent') {
        // "Permanent" has no end date to calculate, its state is handled in updateBilling
        return;
    }
    
    switch (cycle) {
        case 'Day':
            endDate.setDate(startDate.getDate() + 1);
            break;
        case 'Week':
            endDate.setDate(startDate.getDate() + 7);
            break;
        case 'Month':
            endDate.setMonth(startDate.getMonth() + 1);
            break;
        case 'Quarter':
            endDate.setMonth(startDate.getMonth() + 3);
            break;
        case 'HalfYear':
            endDate.setMonth(startDate.getMonth() + 6);
            break;
        case 'Year':
            endDate.setFullYear(startDate.getFullYear() + 1);
            break;
        case '2Year':
            endDate.setFullYear(startDate.getFullYear() + 2);
            break;
        case '3Year':
            endDate.setFullYear(startDate.getFullYear() + 3);
            break;
        case '4Year':
            endDate.setFullYear(startDate.getFullYear() + 4);
            break;
        case '5Year':
            endDate.setFullYear(startDate.getFullYear() + 5);
            break;
    }
    
    document.getElementById('endDate').value = formatDateTimeLocal(endDate);
    updateBilling(); // Sync state after calculation
}

// 格式化日期时间为本地输入格式
function formatDateTimeLocal(date) {
    if (date.getFullYear() === 0) {
        return '0000-01-01T00:00';
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// 更新账单配置
function updateBilling() {
    const startDate = document.getElementById('startDate').value;
    const endDateInput = document.getElementById('endDate');
    const autoRenewal = document.getElementById('autoRenewal').checked;
    const cycle = document.getElementById('cycle').value;
    const wasCycleChanged = document.activeElement.id === 'cycle';

    if (cycle === 'Permanent') {
        endDateInput.disabled = true;
    } else {
        endDateInput.disabled = false;
        if (wasCycleChanged) {
            calculateEndDate();
            return; // calculateEndDate calls updateBilling, so we exit to prevent double processing
        }
    }
    
    // 检查是否为非官方周期
    if (unofficialCycles.includes(cycle)) {
        showWarning('unofficial', { cycle: getCycleDisplayName(cycle) });
        
        // 禁用autoRenewal
        document.getElementById('autoRenewal').disabled = true;
        document.getElementById('autoRenewal').checked = false;
        
        state.config.billingDataMod.autoRenewal = '0';
    } else {
        document.getElementById('autoRenewal').disabled = false;
        state.config.billingDataMod.autoRenewal = autoRenewal ? '1' : '0';
    }
    
    // 更新配置
    state.config.billingDataMod.startDate = new Date(startDate).toISOString();
    
    if (cycle === 'Permanent') {
        state.config.billingDataMod.endDate = '0000-00-00T23:59:59+08:00';
    } else {
        state.config.billingDataMod.endDate = new Date(endDateInput.value).toISOString();
    }
    
    state.config.billingDataMod.cycle = getCycleValue();
    state.config.billingDataMod.amount = getAmountValue();
    
    // 更新货币格式选项
    updateCurrencyFormatOptions();
    
    updateJsonCode();
}

// 获取周期显示名称
function getCycleDisplayName(cycle) {
    const isEnglish = document.getElementById('cycleLanguage').checked;
    const dict = isEnglish ? i18n[state.language].cyclesEn : i18n[state.language].cycles;
    return dict[cycle] || cycle;
}

// 获取周期值
function getCycleValue() {
    const cycle = document.getElementById('cycle').value;
    const isEnglish = document.getElementById('cycleLanguage').checked;
    
    if (isEnglish) {
        return cycle;
    } else {
        return i18n[state.language].cycles[cycle] || cycle;
    }
}

// 更新周期选项
function updateCycleOptions() {
    const select = document.getElementById('cycle');
    const isEnglish = document.getElementById('cycleLanguage').checked;
    const dict = isEnglish ? i18n[state.language].cyclesEn : i18n[state.language].cycles;
    
    Array.from(select.options).forEach(option => {
        const key = option.value;
        const baseText = dict[key] || key;
        
        if (unofficialCycles.includes(key) && !isEnglish) {
            option.textContent = baseText + '（非官方）';
        } else if (unofficialCycles.includes(key) && isEnglish) {
            option.textContent = baseText + ' (Unofficial)';
        } else {
            option.textContent = baseText;
        }
    });
    
    updateBilling();
}

// 更新周期语言
function updateCycleLanguage() {
    updateCycleOptions();
}

// 金额类型更新
function updateAmountType() {
    const amountType = document.getElementById('amountType').value;
    const amountInputs = document.getElementById('amountInputs');
    
    if (amountType === 'free') {
        amountInputs.style.display = 'none';
        state.config.billingDataMod.amount = '0';
    } else if (amountType === 'payAsGo') {
        amountInputs.style.display = 'none';
        state.config.billingDataMod.amount = '-1';
    } else {
        amountInputs.style.display = 'flex';
        updateBilling();
        return;
    }
    
    updateJsonCode();
}

// 获取金额值
function getAmountValue() {
    const amountType = document.getElementById('amountType').value;
    
    if (amountType === 'free') return '0';
    if (amountType === 'payAsGo') return '-1';
    
    const value = document.getElementById('amountValue').value;
    const currency = document.getElementById('currency').value;
    const format = document.getElementById('currencyFormat').value;
    
    switch (format) {
        case 'before':
            return `${value}${currency}`;
        case 'symbol_before':
            return `${currencySymbols[currency]}${value}`;
        case 'after':
            return `${value}${currencySymbols[currency]}`;
        default:
            return `${value}${currency}`;
    }
}

// 更新套餐配置
function updatePlan() {
    const bandwidthValue = document.getElementById('bandwidthValue').value;
    const bandwidthUnit = document.getElementById('bandwidthUnit').value;
    const trafficValue = document.getElementById('trafficValue').value;
    const trafficUnit = document.getElementById('trafficUnit').value;
    const trafficPeriod = document.getElementById('trafficPeriod').value;
    const trafficType = document.getElementById('trafficType').value;
    const ipv4 = document.getElementById('ipv4').value;
    const ipv6 = document.getElementById('ipv6').value;
    const networkRoute = document.getElementById('networkRoute').value;
    
    // 更新配置
    state.config.planDataMod.bandwidth = getBandwidthValue();
    state.config.planDataMod.trafficVol = getTrafficVolValue();
    state.config.planDataMod.trafficType = trafficType;
    state.config.planDataMod.IPv4 = ipv4;
    state.config.planDataMod.IPv6 = ipv6;
    state.config.planDataMod.networkRoute = networkRoute;
    state.config.planDataMod.extra = state.tags.join(', ');
    
    updateJsonCode();
}

// 获取带宽值
function getBandwidthValue() {
    const bandwidthValue = document.getElementById('bandwidthValue').value;
    const bandwidthUnit = document.getElementById('bandwidthUnit').value;
    
    if (bandwidthUnit === 'Unlimited') {
        return __('unlimited');
    }
    
    return `${bandwidthValue}${bandwidthUnit}`;
}

// 更新带宽单位
function updateBandwidthUnit() {
    const bandwidthUnit = document.getElementById('bandwidthUnit').value;
    const bandwidthValueInput = document.getElementById('bandwidthValue');
    
    if (bandwidthUnit === 'Unlimited') {
        bandwidthValueInput.disabled = true;
        bandwidthValueInput.value = '';
    } else {
        bandwidthValueInput.disabled = false;
        if (!bandwidthValueInput.value) {
            bandwidthValueInput.value = '30';
        }
    }
    
    updatePlan();
}

// 更新流量单位
function updateTrafficUnit() {
    const trafficUnit = document.getElementById('trafficUnit').value;
    const trafficPeriod = document.getElementById('trafficPeriod');
    const trafficValueInput = document.getElementById('trafficValue');
    
    if (trafficUnit === 'Unlimited') {
        trafficPeriod.value = 'Unlimited';
        trafficPeriod.disabled = true;
        trafficValueInput.disabled = true;
        trafficValueInput.value = '';
    } else {
        trafficPeriod.disabled = false;
        trafficValueInput.disabled = false;
        if (!trafficValueInput.value) {
            trafficValueInput.value = '1';
        }
    }
    
    updatePlan();
}

// 获取流量配额值
function getTrafficVolValue() {
    const trafficValue = document.getElementById('trafficValue').value;
    const trafficUnit = document.getElementById('trafficUnit').value;
    const trafficPeriod = document.getElementById('trafficPeriod').value;
    const isEnglish = document.getElementById('trafficLanguage').checked;
    
    if (trafficUnit === 'Unlimited') {
        return __('unlimited');
    }
    
    const unitDisplay = trafficUnit === 'Unlimited' ? __('unlimited') : trafficUnit;
    const periodDisplay = getPeriodDisplay(trafficPeriod, isEnglish);
    
    return `${trafficValue}${unitDisplay}/${periodDisplay}`;
}

// 获取周期显示
function getPeriodDisplay(period, isEnglish) {
    if (period === 'Unlimited') {
        return __('unlimited');
    }
    
    const dict = isEnglish ? i18n[state.language].trafficPeriodsEn : i18n[state.language].trafficPeriods;
    return dict[period] || period;
}

// 更新流量周期选项
function updateTrafficPeriodOptions() {
    const select = document.getElementById('trafficPeriod');
    const isEnglish = document.getElementById('trafficLanguage').checked;
    const dict = isEnglish ? i18n[state.language].trafficPeriodsEn : i18n[state.language].trafficPeriods;
    
    Array.from(select.options).forEach(option => {
        const key = option.value;
        option.textContent = dict[key] || key;
    });
    
    updatePlan();
}

// 更新流量语言
function updateTrafficLanguage() {
    updateTrafficPeriodOptions();
}

// 更新货币格式选项
function updateCurrencyFormatOptions() {
    const amountValue = document.getElementById('amountValue').value || '12';
    const currency = document.getElementById('currency').value;
    const select = document.getElementById('currencyFormat');
    
    const symbol = currencySymbols[currency];
    
    Array.from(select.options).forEach(option => {
        switch (option.value) {
            case 'before':
                option.textContent = `${amountValue}${currency}`;
                break;
            case 'symbol_before':
                option.textContent = `${symbol}${amountValue}`;
                break;
            case 'after':
                option.textContent = `${amountValue}${symbol}`;
                break;
        }
    });
}

// 标签管理
function addTag() {
    const input = document.getElementById('newTag');
    const tagText = input.value.trim();
    
    if (tagText && !state.tags.includes(tagText)) {
        state.tags.push(tagText);
        renderTags();
        input.value = '';
        updatePlan();
    }
}

function removeTag(button) {
    const tagElement = button.parentElement;
    const tagText = tagElement.querySelector('span').textContent;
    
    state.tags = state.tags.filter(tag => tag !== tagText);
    renderTags();
    updatePlan();
}

function renderTags() {
    const container = document.getElementById('tagsContainer');
    container.innerHTML = '';
    
    state.tags.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'tag';
        tagElement.innerHTML = `
            <span>${tag}</span>
            <button onclick="removeTag(this)"><i class="fas fa-times"></i></button>
        `;
        container.appendChild(tagElement);
    });
}

function handleTagInput(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTag();
    }
}

// JSON代码更新
function updateJsonCode() {
    const config = {};
    
    if (state.config.enableBilling) {
        config.billingDataMod = { ...state.config.billingDataMod };
    }
    
    if (state.config.enablePlan) {
        config.planDataMod = { ...state.config.planDataMod };
    }
    
    const jsonString = JSON.stringify(config, null, 2);
    document.getElementById('jsonCode').value = jsonString;
}

// 从代码刷新配置
function refreshFromCode(event) {
    event.stopPropagation();
    const refreshIcon = document.querySelector('.refresh-btn i');
    refreshIcon.classList.add('spinning');
    
    try {
        const jsonCode = document.getElementById('jsonCode').value;
        const parsedConfig = JSON.parse(jsonCode);
        
        // 更新状态
        if (parsedConfig.billingDataMod) {
            state.config.enableBilling = true;
            state.config.billingDataMod = { ...parsedConfig.billingDataMod };
            document.getElementById('enableBilling').checked = true;
            document.getElementById('billingForm').classList.remove('hidden');
            
            // 更新表单字段
            if (parsedConfig.billingDataMod.startDate) {
                document.getElementById('startDate').value = formatDateTimeLocal(new Date(parsedConfig.billingDataMod.startDate));
            }
            if (parsedConfig.billingDataMod.endDate) {
                document.getElementById('endDate').value = formatDateTimeLocal(new Date(parsedConfig.billingDataMod.endDate));
            }
            if (parsedConfig.billingDataMod.autoRenewal !== undefined) {
                document.getElementById('autoRenewal').checked = parsedConfig.billingDataMod.autoRenewal === '1';
            }
            
            // 解析周期
            if (parsedConfig.billingDataMod.cycle) {
                parseAndSetCycle(parsedConfig.billingDataMod.cycle);
            }
            
            // 解析金额
            if (parsedConfig.billingDataMod.amount) {
                parseAndSetAmount(parsedConfig.billingDataMod.amount);
            }
        } else {
            state.config.enableBilling = false;
            document.getElementById('enableBilling').checked = false;
            document.getElementById('billingForm').classList.add('hidden');
        }
        
        if (parsedConfig.planDataMod) {
            state.config.enablePlan = true;
            state.config.planDataMod = { ...parsedConfig.planDataMod };
            document.getElementById('enablePlan').checked = true;
            document.getElementById('planForm').classList.remove('hidden');
            
            // 解析带宽
            if (parsedConfig.planDataMod.bandwidth) {
                parseAndSetBandwidth(parsedConfig.planDataMod.bandwidth);
            }
            
            // 解析流量
            if (parsedConfig.planDataMod.trafficVol) {
                parseAndSetTrafficVol(parsedConfig.planDataMod.trafficVol);
            }
            
            // 更新其他字段
            if (parsedConfig.planDataMod.trafficType) {
                document.getElementById('trafficType').value = parsedConfig.planDataMod.trafficType;
            }
            if (parsedConfig.planDataMod.IPv4) {
                document.getElementById('ipv4').value = parsedConfig.planDataMod.IPv4;
            }
            if (parsedConfig.planDataMod.IPv6) {
                document.getElementById('ipv6').value = parsedConfig.planDataMod.IPv6;
            }
            if (parsedConfig.planDataMod.networkRoute) {
                document.getElementById('networkRoute').value = parsedConfig.planDataMod.networkRoute;
            }
            
            // 更新标签
            if (parsedConfig.planDataMod.extra) {
                state.tags = parsedConfig.planDataMod.extra.split(', ').filter(tag => tag.trim());
                renderTags();
            }
        } else {
            state.config.enablePlan = false;
            document.getElementById('enablePlan').checked = false;
            document.getElementById('planForm').classList.add('hidden');
        }
        
        showToast(__('refreshSuccess', { 'fallback': '刷新成功！' }));
    } catch (error) {
        console.error('JSON解析错误:', error);
        showWarning('jsonError', { error: error.message });
    }
    
    setTimeout(() => {
        refreshIcon.classList.remove('spinning');
    }, 1000);
}

// 解析并设置周期
function parseAndSetCycle(cycleValue) {
    const cycleSelect = document.getElementById('cycle');
    const cycleLanguageToggle = document.getElementById('cycleLanguage');
    
    // 检查是否为英文周期
    const isEnglishCycle = ['Day', 'Week', 'Quarter', 'HalfYear', 'Year', '2Year', '3Year', '4Year', '5Year', 'Permanent'].includes(cycleValue);
    
    if (isEnglishCycle) {
        cycleLanguageToggle.checked = true;
        cycleSelect.value = cycleValue;
    } else {
        cycleLanguageToggle.checked = false;
        // 查找对应的中文周期
        for (const [key, value] of Object.entries(i18n[state.language].cycles)) {
            if (value === cycleValue) {
                cycleSelect.value = key;
                break;
            }
        }
    }
    updateCycleOptions();
}

// 解析并设置金额
function parseAndSetAmount(amountValue) {
    const amountTypeSelect = document.getElementById('amountType');
    const amountValueInput = document.getElementById('amountValue');
    const currencySelect = document.getElementById('currency');
    const currencyFormatSelect = document.getElementById('currencyFormat');
    
    if (amountValue === '0') {
        amountTypeSelect.value = 'free';
        updateAmountType();
        return;
    }
    
    if (amountValue === '-1') {
        amountTypeSelect.value = 'payAsGo';
        updateAmountType();
        return;
    }
    
    amountTypeSelect.value = 'billing';
    updateAmountType();
    
    // 解析金额格式
    const currencyRegex = /([¥$€£])(\d+)|(\d+)(CNY|USD|EUR|GBP|¥|$|€|£)/;
    const match = amountValue.match(currencyRegex);
    
    if (match) {
        if (match[1] && match[2]) {
            // 符号在前 ¥12
            const symbol = match[1];
            const value = match[2];
            amountValueInput.value = value;
            
            // 找到对应的货币
            for (const [curr, sym] of Object.entries(currencySymbols)) {
                if (sym === symbol) {
                    currencySelect.value = curr;
                    break;
                }
            }
            currencyFormatSelect.value = 'symbol_before';
        } else if (match[3] && match[4]) {
            const value = match[3];
            const currencyOrSymbol = match[4];
            amountValueInput.value = value;
            
            if (['CNY', 'USD', 'EUR', 'GBP'].includes(currencyOrSymbol)) {
                // 货币代码
                currencySelect.value = currencyOrSymbol;
                currencyFormatSelect.value = 'before';
            } else {
                // 货币符号在后
                for (const [curr, sym] of Object.entries(currencySymbols)) {
                    if (sym === currencyOrSymbol) {
                        currencySelect.value = curr;
                        break;
                    }
                }
                currencyFormatSelect.value = 'after';
            }
        }
    }
    
    updateCurrencyFormatOptions();
}

// 解析并设置带宽
function parseAndSetBandwidth(bandwidthValue) {
    const bandwidthValueInput = document.getElementById('bandwidthValue');
    const bandwidthUnitSelect = document.getElementById('bandwidthUnit');
    
    if (bandwidthValue === __('unlimited') || bandwidthValue === 'Unlimited') {
        bandwidthUnitSelect.value = 'Unlimited';
        bandwidthValueInput.value = '';
        bandwidthValueInput.disabled = true;
        return;
    }
    
    const bandwidthRegex = /(\d+)(Mbps|Gbps)/;
    const match = bandwidthValue.match(bandwidthRegex);
    
    if (match) {
        bandwidthValueInput.value = match[1];
        bandwidthUnitSelect.value = match[2];
        bandwidthValueInput.disabled = false;
    }
}

// 解析并设置流量配额
function parseAndSetTrafficVol(trafficVolValue) {
    const trafficValueInput = document.getElementById('trafficValue');
    const trafficUnitSelect = document.getElementById('trafficUnit');
    const trafficPeriodSelect = document.getElementById('trafficPeriod');
    const trafficLanguageToggle = document.getElementById('trafficLanguage');
    
    if (trafficVolValue === __('unlimited') || trafficVolValue === 'Unlimited') {
        trafficUnitSelect.value = 'Unlimited';
        trafficPeriodSelect.value = 'Unlimited';
        trafficValueInput.value = '';
        trafficValueInput.disabled = true;
        trafficPeriodSelect.disabled = true;
        return;
    }
    
    // 解析流量格式 1TB/Month
    const trafficRegex = /(\d+)(MB|GB|TB|PB)\/(.+)/;
    const match = trafficVolValue.match(trafficRegex);
    
    if (match) {
        trafficValueInput.value = match[1];
        trafficUnitSelect.value = match[2];
        trafficValueInput.disabled = false;
        trafficPeriodSelect.disabled = false;
        
        const periodValue = match[3];
        
        // 检查是否为英文周期
        const isEnglishPeriod = ['Day', 'Month', 'Quarter', 'Year', 'Unlimited'].includes(periodValue);
        
        if (isEnglishPeriod) {
            trafficLanguageToggle.checked = true;
            trafficPeriodSelect.value = periodValue;
        } else {
            trafficLanguageToggle.checked = false;
            // 查找对应的英文周期
            for (const [key, value] of Object.entries(i18n[state.language].trafficPeriods)) {
                if (value === periodValue) {
                    trafficPeriodSelect.value = key;
                    break;
                }
            }
        }
        
        updateTrafficPeriodOptions();
    }
}

// 代码变化处理
function handleCodeChange() {
    if (!state.isManualRefresh) {
        // 实时更新逻辑可以在这里添加
    }
}

// 折叠卡片
function toggleCardCollapse(headerElement) {
    const card = headerElement.closest('.form-section, .code-panel');
    const content = card.querySelector('.form-content, .code-container');
    const icon = headerElement.querySelector('.collapse-btn i');

    content.classList.toggle('collapsed');
    icon.classList.toggle('rotated');
}

// 复制代码
function copyCode(event) {
    event.stopPropagation();
    const jsonCode = document.getElementById('jsonCode');
    jsonCode.select();
    document.execCommand('copy');
    showToast();
}

// 显示警告模态框
function showWarning(type, params = {}) {
    const modal = document.getElementById('warningModal');
    const message = document.getElementById('warningMessage');
    
    const warningKey = `warningMessages.${type}`;
    message.textContent = i18n[state.language].warningMessages[type] ? 
        i18n[state.language].warningMessages[type].replace(/\{(\w+)\}/g, (match, key) => params[key] || match) :
        `Warning: ${type}`;
    modal.style.display = 'block';
}

// 关闭模态框
function closeModal() {
    document.getElementById('warningModal').style.display = 'none';
}

// 显示提示消息
function showToast(message) {
    const toast = document.getElementById('copyToast');
    const toastMessage = toast.querySelector('span');

    const defaultCopySuccess = __('copySuccess', { fallback: '复制成功！' });
    toastMessage.textContent = message || defaultCopySuccess;

    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('warningModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
} 