const menuData = [
    { category: "毛穴洗浄", name: "ハイドラジェントル", first: 7700, regular: 14300 },
    { category: "美容液導入", name: "メソナJ", first: 11000, regular: 22000 },
    { category: "美容液導入", name: "エレクトロポレーション", first: 6600, regular: 13200 },
    { category: "IPL", name: "IPL　顔", first: 7700, regular: 14300 },
    { category: "IPL", name: "IPL　顔＋首", first: 11000, regular: 22000 },
    { category: "IPL", name: "IPL　手の甲", first: null, regular: 3300 },
    { category: "IPL", name: "IPL　腕全体", first: null, regular: 7700 },
    { category: "ピコレーザー", name: "ピコトーニング", first: 7700, regular: 14300 },
    { category: "ピコレーザー", name: "ピコフラクショナル", first: 11000, regular: 22000 },
    { category: "ピコレーザー", name: "ピコダブル", first: 18700, regular: 25300 },
    { category: "ケミカルピーリング", name: "マッサージピール　顔", first: 6600, regular: 13200 },
    { category: "ケミカルピーリング", name: "マッサージピール　顔＋首", first: 9900, regular: 14300 },
    { category: "ケミカルピーリング", name: "リバースピール（顔のみ）", first: 7700, regular: 14300 },
    { category: "ケミカルピーリング", name: "サリチル酸マクロゴール　顔", first: 3300, regular: 6600 },
    { category: "ケミカルピーリング", name: "サリチル酸マクロゴール　顔＋首", first: 4500, regular: 9900 },
    { category: "ケミカルピーリング", name: "サリチル酸マクロゴール＋ブルーレーザー　顔", first: 6600, regular: 9900 },
    { category: "ケミカルピーリング", name: "サリチル酸マグコロール＋ブルーレーザー　顔＋首", first: 9900, regular: 14300 },
    { category: "ブルーレーザー", name: "ブルーレーザー　顔", first: null, regular: 6600 },
    { category: "ブルーレーザー", name: "ブルーレーザー　顔＋首", first: null, regular: 9900 },
    { category: "HIFU", name: "HIFU シャワー(顔下半分)（2mm）", first: 14300, regular: 27500 },
    { category: "HIFU", name: "HIFU 目（2mm）", first: 17600, regular: 34100 },
    { category: "HIFU", name: "HIFU 顔 ライト（2mm）", first: 29700, regular: 46400 },
    { category: "HIFU", name: "HIFU 顔 ミドル (2mm,3mm)", first: 34100, regular: 57200 },
    { category: "HIFU", name: "HIFU 顔 フル (2mm,3mm,4.5mm)", first: 45100, regular: 68200 },
    { category: "インモード", name: "インモード FORMA", first: 22000, regular: 35200 },
    { category: "インモード", name: "インモード Fx", first: 22000, regular: 35200 },
    { category: "インモード", name: "インモードVリフト（FORMA＋Fxセット）", first: 44000, regular: 57200 },
    { category: "インモード ルメッカ", name: "ルメッカ", first: 16500, regular: 24200 },
    { category: "インモード ルメッカ", name: "ルメッカ 顔＋首", first: 24700, regular: 36200 },
    { category: "ダーマペン", name: "ダーマペン オプションなし", first: 14300, regular: 20900 },
    { category: "ダーマペン", name: "ダーマペン レチノールアクティブ", first: 15400, regular: 23100 },
    { category: "ダーマペン", name: "ベルベットスキン", first: 17600, regular: 27500 },
    { category: "ニードルRF", name: "ニードルRF 顔 （リジュラン追加＋16500）", first: 23100, regular: 35200 },
    { category: "ニードルRF", name: "ニードルRF 顔 首 （リジュラン追加＋16500）", first: 34300, regular: 46400 },
    { category: "ニードルRF", name: "ニードルRF 顔 ニキビモード", first: 24200, regular: 37400 },
    { category: "痩身", name: "クールスカルプティング", first: null, regular: 33000 },
    { category: "痩身", name: "エムスカルプトNEO", first: 22000, regular: 44000 },
    { category: "セットメニュー", name: "ハイドラ＋メソナJ", first: 18700, regular: 25300 },
    { category: "カウンセリング", name: "カウンセリング （VISIA撮影付き）", first: null, regular: 2200 }
];

let selectedMenus = {};
let hasWeekdayDiscount = false;
let hasLineDiscount = false;
let hasStudentDiscount = false;
let hasInmodeRepeatDiscount = false;
// 1会計1クーポンルール用
let usedCouponType = null; // 使用中のクーポンタイプ（line/weekday/repeat）
let usedCouponLocation = null; // クーポンを使用した場所（beauty/hairRemoval）

// 学割美容施術価格
const studentBeautyPrices = {
    "サリチル酸マクロゴール　顔": 3300,
    "ハイドラジェントル": 6600,
    "IPL　顔": 6600,
    "ブルーレーザー　顔": 3300,
    "サリチル酸マクロゴール＋ブルーレーザー　顔": 6600
};

// 脱毛メニューのデータ
const hairRemovalMenuData = {
    female: {
        全身脱毛: [
            { name: "両わき・ひじ下・ひざ下", first: 11000, regular: 22000, noon: 11000 },
            { name: "腕、足、脇", first: 16500, regular: 33000, noon: 22000 },
            { name: "全身脱毛バリューコース", first: 27500, regular: 55000, noon: 44000, note: "腕、足、体幹（顔、うなじ、VIO除く）" },
            { name: "全身脱毛", first: 38500, regular: 77000, noon: 55000, note: "顔、うなじ、VIOを含む全身" }
        ],
        部分脱毛: [
            { name: "SSパーツ", first: 2200, regular: 4400, parts: ["ワキ", "手の甲と指", "足背と足趾", "耳"] },
            { name: "Sパーツ", first: 2750, regular: 5500, parts: ["うなじ", "首", "おでこ", "ほほ", "ひざ"] },
            { name: "Mパーツ", first: 8250, regular: 16500, parts: ["顔（女性）", "ひじ上", "ひじ下", "Vライン", "Iライン", "Oライン"] },
            { name: "Lパーツ", first: 11000, regular: 22000, parts: ["胸部", "腹部", "ひざ上", "ひざ下"] },
            { name: "LLパーツ", first: 13200, regular: 26400, parts: ["腕全部（脇含まない）", "脚全部", "背中", "VIO"] }
        ]
    },
    male: {
        全身脱毛: [
            { name: "両わき・ひじ下・ひざ下", first: 12000, regular: 24000, noon: 12000 },
            { name: "腕、足、脇", first: 18000, regular: 36000, noon: 25000 },
            { name: "全身脱毛バリューコース", first: 33000, regular: 66000, noon: 55000, note: "腕、足、体幹（顔、うなじ、VIO除く）" }
        ],
        部分脱毛: [
            { name: "SSパーツ", first: 2200, regular: 4400, parts: ["ワキ", "手の甲と指", "足背と足趾", "耳"] },
            { name: "Sパーツ", first: 2750, regular: 5500, parts: ["うなじ", "首", "おでこ", "ほほ", "ひざ"] },
            { name: "Mパーツ", first: 8250, regular: 16500, parts: ["ひげ（麻酔込み）", "ひじ上", "ひじ下"] },
            { name: "Lパーツ", first: 11000, regular: 22000, parts: ["胸部", "腹部", "ひざ上", "ひざ下", "顔（男性、半顔、麻酔込み）"] },
            { name: "LLパーツ", first: 13200, regular: 26400, parts: ["腕全部（脇含まない）", "脚全部", "背中"] }
        ]
    },
    学生割引: {
        female: [
            { name: "両わき・ひじ下・ひざ下", regular: 11000, fiveTimes: 55000 },
            { name: "腕、足、脇", regular: 16500, fiveTimes: 82500 },
            { name: "全身脱毛バリューコース", regular: 27500, fiveTimes: 137500 }
        ],
        male: [
            { name: "両わき・ひじ下・ひざ下", regular: 12000, fiveTimes: 60000 },
            { name: "腕、足、脇", regular: 18000, fiveTimes: 90000 },
            { name: "全身脱毛バリューコース", regular: 33000, fiveTimes: 165000 }
        ]
    },
    その他: [
        { name: "1ショット", regular: 660 },
        { name: "剃毛（1部位）", regular: 2200 },
        { name: "麻酔（1部位）", regular: 1100 }
    ]
};

// 脱毛選択システム用の変数
let hairRemovalSelection = []; // 選択アイテムの配列
let hairRemovalSelectionId = 0; // 選択アイテムのユニークID
let hairRemovalPriceTypes = {}; // 各メニューの選択された価格タイプを保存

// グローバル割引管理（1会計1割引ルール用）
let globalDiscountState = {
    hasDiscount: false,  // 昼割以外の割引が選択されているか
    discountType: null,  // 選択されている割引の種類
    source: null         // 'beauty' または 'hairRemoval'
};

// 警告メッセージを表示する関数
function showWarning(message) {
    const warningDiv = document.getElementById('warningMessage');
    if (!warningDiv) return;
    
    warningDiv.textContent = message;
    warningDiv.style.display = 'flex';
    
    // 5秒後に自動的に非表示
    setTimeout(() => {
        warningDiv.style.display = 'none';
    }, 5000);
}

// 警告メッセージを非表示にする関数
function hideWarning() {
    const warningDiv = document.getElementById('warningMessage');
    if (warningDiv) {
        warningDiv.style.display = 'none';
    }
}

// グローバル割引をクリアする関数
function clearGlobalDiscount() {
    globalDiscountState.hasDiscount = false;
    globalDiscountState.discountType = null;
    globalDiscountState.source = null;
}

// クーポンの使用状況をクリアする関数
function clearUsedCoupon() {
    usedCouponType = null;
    usedCouponLocation = null;
}

// クーポンかどうかを判定する関数
function isCoupon(discountType) {
    return ['line', 'weekday', 'repeat'].includes(discountType);
}

// クーポンが使用可能かチェックする関数
function canUseCoupon(discountType, location) {
    if (!isCoupon(discountType)) return true;
    
    // 既に何かのクーポンが使用されている場合
    if (usedCouponType) {
        return false;
    }
    
    return true;
}

// 脱毛の全ての割引を無効化する関数（昼割以外）
function disableAllHairRemovalDiscounts() {
    // 全身脱毛・部分脱毛の全メニューの割引を無効化
    const discountTypes = ['student', 'line', 'repeat', 'coupon'];
    
    // 既存の全ての脱毛メニューIDを取得
    document.querySelectorAll('[id^="student_hr"], [id^="line_hr"], [id^="repeat_hr"], [id^="coupon_hr"]').forEach(checkbox => {
        if (checkbox && checkbox.checked) {
            checkbox.checked = false;
            checkbox.disabled = false; // 一旦有効化してから処理
        }
    });
    
    // 部位選択の割引も無効化
    document.querySelectorAll('[id^="student_part_"], [id^="line_part_"], [id^="repeat_part_"], [id^="coupon_part_"]').forEach(checkbox => {
        if (checkbox && checkbox.checked) {
            checkbox.checked = false;
            checkbox.disabled = false;
        }
    });
}

// 美容施術の全ての割引を無効化する関数
function disableAllBeautyDiscounts() {
    Object.keys(selectedMenus).forEach(itemId => {
        ['weekday', 'line', 'repeat', 'student'].forEach(type => {
            const checkbox = document.getElementById(`${type}_${itemId}`);
            if (checkbox && checkbox.checked) {
                checkbox.checked = false;
            }
        });
    });
    appliedDiscountType = null;
}

function initializeMenuList() {
    const menuListDiv = document.getElementById('menuList');
    const categories = [...new Set(menuData.map(item => item.category))];
    
    let html = '';
    categories.forEach(category => {
        html += `<div class="menu-category">`;
        html += `<div class="menu-category-title">${category}</div>`;
        
        menuData.filter(item => item.category === category).forEach((item, index) => {
            const itemId = `menu_${category.replace(/\s/g, '_')}_${index}`;
            const showRepeatDiscount = ['インモード FORMA', 'インモード Fx', 'インモードVリフト（FORMA＋Fxセット）'].includes(item.name);
            const isDiscountDisabled = ['クールスカルプティング', 'カウンセリング （VISIA撮影付き）'].includes(item.name);
            const isPriceTypeDisabled = ['クールスカルプティング', 'カウンセリング （VISIA撮影付き）'].includes(item.name);
            
            html += `
                <div class="menu-item" id="item_${itemId}">
                    <div class="menu-item-header">
                        <input type="checkbox" id="${itemId}" onchange="toggleMenu('${itemId}', '${item.name}')">
                        <label for="${itemId}" class="menu-item-name">${item.name}</label>
                    </div>
                    <div class="menu-item-controls">
                        <div class="control-row">
                            <div class="control-group">
                                ${!isPriceTypeDisabled ? `
                                <label>価格タイプ</label>
                                <div class="price-type-buttons">
                                    <button class="price-type-button ${item.first ? 'active' : ''}" 
                                            id="first_${itemId}" 
                                            onclick="setPriceType('${itemId}', 'first')"
                                            ${!item.first ? 'disabled' : ''}>
                                        初回価格${item.first ? ` ¥${item.first.toLocaleString()}` : ''}
                                    </button>
                                    <button class="price-type-button ${!item.first ? 'active' : ''}" 
                                            id="regular_${itemId}" 
                                            onclick="setPriceType('${itemId}', 'regular')">
                                        通常価格 ¥${item.regular.toLocaleString()}
                                    </button>
                                </div>
                                ` : `
                                <label>価格</label>
                                <div style="font-size: 16px; padding: 10px 0;">
                                    通常価格のみ
                                </div>
                                `}
                            </div>
                            <div class="price-display" id="display_${itemId}">
                                ¥${(item.first || item.regular).toLocaleString()}
                            </div>
                        </div>
                        ${!isDiscountDisabled ? `
                        <div class="control-group">
                            <label>割引適用</label>
                            <div class="discount-checkboxes">
                                <div class="discount-checkbox" id="weekday_wrapper_${itemId}">
                                    <input type="checkbox" id="weekday_${itemId}" onchange="updateItemPrice('${itemId}', 'weekday')">
                                    <label for="weekday_${itemId}">平日2200円OFF</label>
                                </div>
                                <div class="discount-checkbox" id="line_wrapper_${itemId}">
                                    <input type="checkbox" id="line_${itemId}" onchange="updateItemPrice('${itemId}', 'line')">
                                    <label for="line_${itemId}">LINE</label>
                                </div>
                                ${showRepeatDiscount ? `
                                <div class="discount-checkbox" id="repeat_wrapper_${itemId}">
                                    <input type="checkbox" id="repeat_${itemId}" onchange="updateItemPrice('${itemId}', 'repeat')">
                                    <label for="repeat_${itemId}">リピートクーポン</label>
                                </div>
                                ` : ''}
                                ${studentBeautyPrices[item.name] ? `
                                <div class="discount-checkbox" id="student_wrapper_${itemId}">
                                    <input type="checkbox" id="student_${itemId}" onchange="updateItemPrice('${itemId}', 'student')">
                                    <label for="student_${itemId}">学割</label>
                                </div>
                                ` : ''}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
    });
    
    menuListDiv.innerHTML = html;
}

function toggleMenu(itemId, menuName) {
    const checkbox = document.getElementById(itemId);
    const menuItem = document.getElementById(`item_${itemId}`);
    
    if (checkbox.checked) {
        menuItem.classList.add('selected');
        const menuInfo = menuData.find(item => item.name === menuName);
        selectedMenus[itemId] = {
            name: menuName,
            ...menuInfo,
            selectedPriceType: menuInfo.first ? 'first' : 'regular'
        };
        updateItemPrice(itemId);
    } else {
        menuItem.classList.remove('selected');
        
        // 平日割引が適用されていた場合は解除
        if (selectedMenus[itemId] && selectedMenus[itemId].hasWeekdayDiscount) {
            hasWeekdayDiscount = false;
        }
        
        // LINEクーポンが適用されていた場合は解除
        if (selectedMenus[itemId] && selectedMenus[itemId].hasLineDiscount) {
            hasLineDiscount = false;
        }
        
        delete selectedMenus[itemId];
    }
    
    updateSummary();
    updateWeekdayDiscountAvailability();
    updateLineDiscountAvailability();
    checkSetMenuCombination();
}

function setPriceType(itemId, priceType) {
    if (!selectedMenus[itemId]) return;
    
    const firstButton = document.getElementById(`first_${itemId}`);
    const regularButton = document.getElementById(`regular_${itemId}`);
    
    if (priceType === 'first' && !firstButton.disabled) {
        firstButton.classList.add('active');
        regularButton.classList.remove('active');
        selectedMenus[itemId].selectedPriceType = 'first';
    } else {
        regularButton.classList.add('active');
        firstButton.classList.remove('active');
        selectedMenus[itemId].selectedPriceType = 'regular';
    }
    
    updateItemPrice(itemId);
    updateDiscountAvailability();
    
    // セットメニューの価格タイプ変更時もチェック
    const menu = selectedMenus[itemId];
    if (menu && (menu.name === 'ハイドラジェントル' || menu.name === 'メソナJ')) {
        checkSetMenuCombination();
    }
}

function updateItemPrice(itemId, discountType) {
    if (!selectedMenus[itemId]) return;
    
    const menu = selectedMenus[itemId];
    const weekdayCheckbox = document.getElementById(`weekday_${itemId}`);
    const lineCheckbox = document.getElementById(`line_${itemId}`);
    const repeatCheckbox = document.getElementById(`repeat_${itemId}`);
    const studentCheckbox = document.getElementById(`student_${itemId}`);
    
    // 1会計1クーポンルールの実装
    if (discountType) {
        const clickedCheckbox = document.getElementById(`${discountType}_${itemId}`);
        
        if (clickedCheckbox && clickedCheckbox.checked) {
            // 初回価格選択時は割引適用不可
            if (menu.selectedPriceType === 'first') {
                clickedCheckbox.checked = false;
                alert('初回価格は最安値のため、他の割引との併用はできません。');
                return;
            }
            
            // クーポンの使用可能性をチェック
            if (isCoupon(discountType)) {
                if (!canUseCoupon(discountType, 'beauty')) {
                    clickedCheckbox.checked = false;
                    const couponNames = {
                        'line': 'LINEクーポン',
                        'weekday': '2200円OFFクーポン',
                        'repeat': 'リピートクーポン'
                    };
                    showWarning(`既に${couponNames[usedCouponType]}が使用されています。1会計につき1つのクーポンのみ使用可能です。`);
                    return;
                }
            }
            
            
            // グローバル割引チェック（クーポンのみチェック）
            if (isCoupon(discountType) && globalDiscountState.hasDiscount && 
                globalDiscountState.source !== 'beauty' && isCoupon(globalDiscountState.discountType)) {
                clickedCheckbox.checked = false;
                showWarning(`脱毛で${globalDiscountState.discountType}が選択されているため、美容施術のクーポンは適用できません。`);
                return;
            }
            
            // クーポンの場合、他のクーポンを全て解除
            if (isCoupon(discountType)) {
                // 美容施術の他のクーポンを解除
                Object.keys(selectedMenus).forEach(id => {
                    ['weekday', 'line', 'repeat'].forEach(type => {
                        if (type !== discountType || id !== itemId) {
                            const checkbox = document.getElementById(`${type}_${id}`);
                            if (checkbox && checkbox.checked) {
                                checkbox.checked = false;
                            }
                        }
                    });
                });
                
                // 脱毛のクーポンも解除
                Object.keys(hairRemovalPriceTypes || {}).forEach(id => {
                    const couponCheckbox = document.getElementById(`coupon_${id}`);
                    const lineCheckbox = document.getElementById(`line_${id}`);
                    if (couponCheckbox && couponCheckbox.checked) {
                        couponCheckbox.checked = false;
                    }
                    if (lineCheckbox && lineCheckbox.checked) {
                        lineCheckbox.checked = false;
                    }
                });
                
                // クーポンタイプを更新
                usedCouponType = discountType;
                usedCouponLocation = 'beauty';
            }
            
            // グローバル割引状態を更新（クーポンのみ）
            if (isCoupon(discountType)) {
                globalDiscountState.hasDiscount = true;
                globalDiscountState.discountType = discountType === 'weekday' ? '平日2200円OFFクーポン' : 
                                                  discountType === 'line' ? 'LINEクーポン' :
                                                  discountType === 'repeat' ? 'リピートクーポン' : discountType;
                globalDiscountState.source = 'beauty';
            }
            
            // 脱毛の割引を全て無効化（昼割以外）
            // disableAllHairRemovalDiscounts(); // クーポンのみ1会計1枚制限
            
            // リピートクーポンの特別処理
            if (discountType === 'repeat') {
                const inmodePrice = {
                    'インモード FORMA': 22000,
                    'インモード Fx': 22000,
                    'インモードVリフト（FORMA＋Fxセット）': 44000
                };
                menu.inmodeRepeatPrice = inmodePrice[menu.name];
            }
        } else {
            // チェックが外された場合
            if (isCoupon(discountType) && usedCouponType === discountType) {
                clearUsedCoupon();
            }
            if (globalDiscountState.discountType === (discountType === 'weekday' ? '平日2200円OFFクーポン' : 
                                                     discountType === 'line' ? 'LINEクーポン' :
                                                     discountType === 'repeat' ? 'リピートクーポン' :
                                                     discountType === 'student' ? '学割' : discountType)) {
                clearGlobalDiscount();
            }
        }
    }
    
    const priceDisplay = document.getElementById(`display_${itemId}`);
    let price = menu.selectedPriceType === 'first' && menu.first ? menu.first : menu.regular;
    let discounts = [];
    
    // セット価格の処理
    if (menu.isSetPrice) {
        price = menu.setPrice;
        if (menu.setPrice === 0) {
            discounts.push('セット価格適用（メソナJ分）');
        } else {
            discounts.push('セット価格適用');
        }
        
        menu.currentPrice = price;
        menu.discounts = discounts;
        priceDisplay.textContent = `¥${price.toLocaleString()}`;
        updateSummary();
        updateDiscountAvailability();
        return;
    }
    
    // 割引の適用（優先順位: LINE > 学割 > インモードリピート > 2200円OFF）
    if (lineCheckbox && lineCheckbox.checked && menu.first) {
        price = menu.first;
        discounts.push('LINEクーポン');
    } else if (studentCheckbox && studentCheckbox.checked && studentBeautyPrices[menu.name]) {
        price = studentBeautyPrices[menu.name];
        discounts.push('学割');
    } else if (repeatCheckbox && repeatCheckbox.checked && menu.inmodeRepeatPrice) {
        price = menu.inmodeRepeatPrice;
        discounts.push('リピートクーポン');
    } else if (weekdayCheckbox && weekdayCheckbox.checked && menu.regular >= 13200) {
        price = menu.regular - 2200;
        discounts.push('2200円OFFクーポン');
    }
    
    menu.currentPrice = price;
    menu.discounts = discounts;
    
    priceDisplay.textContent = `¥${price.toLocaleString()}`;
    updateSummary();
    updateDiscountAvailability();
    checkSetMenuCombination();
}

function updateDiscountAvailability() {
    Object.keys(selectedMenus).forEach(itemId => {
        const menu = selectedMenus[itemId];
        const weekdayCheckbox = document.getElementById(`weekday_${itemId}`);
        const lineCheckbox = document.getElementById(`line_${itemId}`);
        const repeatCheckbox = document.getElementById(`repeat_${itemId}`);
        const studentCheckbox = document.getElementById(`student_${itemId}`);
        
        // 初回価格選択時は全ての割引を無効化
        const isFirstPrice = menu.selectedPriceType === 'first';
        
        // 2200円OFFクーポンの条件
        if (weekdayCheckbox) {
            const weekdayWrapper = document.getElementById(`weekday_wrapper_${itemId}`);
            const shouldDisable = isFirstPrice || menu.regular < 13200 || 
                (usedCouponType !== null && usedCouponType !== 'weekday');
            
            weekdayCheckbox.disabled = shouldDisable;
            weekdayWrapper.classList.toggle('disabled', shouldDisable);
        }
        
        // LINEクーポンの条件
        if (lineCheckbox) {
            const lineWrapper = document.getElementById(`line_wrapper_${itemId}`);
            const shouldDisable = isFirstPrice || !menu.first || 
                (usedCouponType !== null && usedCouponType !== 'line');
            
            lineCheckbox.disabled = shouldDisable;
            lineWrapper.classList.toggle('disabled', shouldDisable);
        }
        
        // リピートクーポンの条件
        if (repeatCheckbox) {
            const repeatWrapper = document.getElementById(`repeat_wrapper_${itemId}`);
            const shouldDisable = isFirstPrice || 
                (usedCouponType !== null && usedCouponType !== 'repeat');
            
            repeatCheckbox.disabled = shouldDisable;
            repeatWrapper.classList.toggle('disabled', shouldDisable);
        }
        
        // 学割の条件（学割同士は併用OK）
        if (studentCheckbox) {
            const studentWrapper = document.getElementById(`student_wrapper_${itemId}`);
            const shouldDisable = isFirstPrice;
            
            studentCheckbox.disabled = shouldDisable;
            studentWrapper.classList.toggle('disabled', shouldDisable);
        }
    });
}

function updateSummary() {
    console.log('[updateSummary] 関数が呼ばれました');
    console.log('[updateSummary] hairRemovalSelection:', hairRemovalSelection);
    
    // 美容施術の数
    const beautyCount = Object.keys(selectedMenus).length;
    // 脱毛の数
    const hairRemovalCount = hairRemovalSelection.length;
    const totalCount = beautyCount + hairRemovalCount;
    
    console.log('[updateSummary] 美容施術数:', beautyCount, '脱毛数:', hairRemovalCount);
    
    if (totalCount === 0) {
        // 固定バーを非表示
        const finalTotalBar = document.getElementById('finalTotalBar');
        finalTotalBar.style.display = 'none';
        return;
    }
    
    let beautyTotal = 0;
    let hairRemovalTotal = 0;
    
    // 美容施術の合計
    Object.values(selectedMenus).forEach(menu => {
        beautyTotal += menu.currentPrice || 0;
    });
    
    // 脱毛の合計
    hairRemovalSelection.forEach(item => {
        const itemPrice = item.price || 0;
        const itemQuantity = item.quantity || 0;
        const itemTotal = itemPrice * itemQuantity;
        hairRemovalTotal += itemTotal;
        
        if (!item.price || item.price === 0) {
            console.warn('[updateSummary] 警告: 価格が設定されていません:', item);
        }
    });
    console.log('[updateSummary] 美容合計:', beautyTotal, '脱毛合計:', hairRemovalTotal, '総合計:', beautyTotal + hairRemovalTotal);
    
    const total = beautyTotal + hairRemovalTotal;
    
    // 固定バーを更新
    const finalTotalBar = document.getElementById('finalTotalBar');
    const finalTotalText = document.getElementById('finalTotalText');
    if (total > 0) {
        finalTotalText.textContent = `合計: ¥${total.toLocaleString()}`;
        finalTotalBar.style.display = 'flex';
    } else {
        finalTotalBar.style.display = 'none';
    }
}

function calculatePrice() {
    if (Object.keys(selectedMenus).length === 0) {
        alert('施術メニューを選択してください');
        return;
    }
    
    // セット価格の最終確認
    checkSetMenuCombination();
    
    const resultDiv = document.getElementById('result');
    const detailsDiv = document.getElementById('priceDetails');
    const finalPriceSpan = document.getElementById('finalPrice');
    
    let html = '<h4>施術内訳</h4>';
    let totalPrice = 0;
    let weekdayDiscountApplied = false;
    
    Object.entries(selectedMenus).forEach(([itemId, menu]) => {
        // セット価格が適用されている場合は、その価格を使用
        let displayPrice = menu.currentPrice;
        if (menu.isSetPrice) {
            displayPrice = menu.setPrice;
        }
        
        const basePrice = menu.selectedPriceType === 'first' && menu.first ? menu.first : menu.regular;
        html += `
            <div class="price-item">
                <div>
                    <span>${menu.name}</span>
                    <div class="price-item-detail">
                        ${menu.selectedPriceType === 'first' ? '初回価格' : '通常価格'}
                        ${menu.discounts.length > 0 ? ' - 割引: ' + menu.discounts.join(', ') : ''}
                    </div>
                </div>
                <span>¥${displayPrice.toLocaleString()}</span>
            </div>
        `;
        totalPrice += displayPrice;
        
        if (menu.discounts.includes('平日割引')) {
            weekdayDiscountApplied = true;
        }
    });
    
    if (weekdayDiscountApplied) {
        html += `
            <div class="price-item" style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #ddd;">
                <span style="color: #d81b60;">平日割引適用済み</span>
                <span style="color: #d81b60;">-¥2,200</span>
            </div>
        `;
    }
    
    detailsDiv.innerHTML = html;
    finalPriceSpan.textContent = '¥' + totalPrice.toLocaleString();
    resultDiv.style.display = 'block';
}

function checkSetMenuCombination() {
    // ハイドラジェントルとメソナJの両方が選択されているかチェック
    let hasHydra = false;
    let hasMesona = false;
    let hydraItemId = null;
    let mesonaItemId = null;
    
    Object.entries(selectedMenus).forEach(([itemId, menu]) => {
        if (menu.name === 'ハイドラジェントル') {
            hasHydra = true;
            hydraItemId = itemId;
        } else if (menu.name === 'メソナJ') {
            hasMesona = true;
            mesonaItemId = itemId;
        }
    });
    
    if (hasHydra && hasMesona) {
        // セット価格に変更
        const setMenu = menuData.find(item => item.name === 'ハイドラ＋メソナJ');
        
        if (hydraItemId && setMenu) {
            const hydraMenu = selectedMenus[hydraItemId];
            const mesonaMenu = selectedMenus[mesonaItemId];
            
            // どちらも初回価格の場合のみ初回セット価格を適用
            const bothFirst = hydraMenu.selectedPriceType === 'first' && mesonaMenu.selectedPriceType === 'first';
            
            // LINEクーポンが適用されている場合もチェック
            const hydraHasLine = document.getElementById(`line_${hydraItemId}`) && document.getElementById(`line_${hydraItemId}`).checked;
            const mesonaHasLine = document.getElementById(`line_${mesonaItemId}`) && document.getElementById(`line_${mesonaItemId}`).checked;
            const hasLineDiscount = hydraHasLine || mesonaHasLine;
            
            // 両方初回、またはLINEクーポン適用時は初回セット価格
            const useFirstPrice = (bothFirst || (hasLineDiscount && hydraMenu.selectedPriceType === 'regular' && mesonaMenu.selectedPriceType === 'regular'));
            const setPrice = useFirstPrice && setMenu.first ? setMenu.first : setMenu.regular;
            
            // ハイドラの価格をセット価格に変更
            hydraMenu.isSetPrice = true;
            hydraMenu.originalPrice = hydraMenu.currentPrice;
            hydraMenu.setPrice = setPrice;
            hydraMenu.setMenuType = useFirstPrice ? 'first' : 'regular';
            
            // メソナJの価格を0円に
            mesonaMenu.isSetPrice = true;
            mesonaMenu.originalPrice = mesonaMenu.currentPrice;
            mesonaMenu.setPrice = 0;
            mesonaMenu.setMenuType = useFirstPrice ? 'first' : 'regular';
            
            // 価格を再計算
            updateItemPrice(hydraItemId);
            updateItemPrice(mesonaItemId);
        }
    } else {
        // セット価格を解除
        Object.entries(selectedMenus).forEach(([itemId, menu]) => {
            if (menu.isSetPrice) {
                menu.isSetPrice = false;
                delete menu.originalPrice;
                delete menu.setPrice;
                updateItemPrice(itemId);
            }
        });
    }
}

function resetAll() {
    // グローバル割引状態をクリア
    clearGlobalDiscount();
    // クーポン管理をクリア
    clearUsedCoupon();
    
    // すべてのチェックボックスをクリア
    Object.keys(selectedMenus).forEach(itemId => {
        const checkbox = document.getElementById(itemId);
        if (checkbox) {
            checkbox.checked = false;
            const menuItem = document.getElementById(`item_${itemId}`);
            if (menuItem) {
                menuItem.classList.remove('selected');
            }
        }
    });
    
    // 選択メニューをクリア
    selectedMenus = {};
    hasWeekdayDiscount = false;
    hasLineDiscount = false;
    hasStudentDiscount = false;
    hasInmodeRepeatDiscount = false;
    
    // 脱毛選択もクリア
    hairRemovalSelection = [];
    hairRemovalSelectionId = 0;
    updateSelectionDisplay();
    
    // サマリーを非表示
    const selectedSummary = document.getElementById('selectedSummary');
    if (selectedSummary) {
        selectedSummary.style.display = 'none';
    }
    
    // 計算結果を非表示
    document.getElementById('result').style.display = 'none';
    
    // 脱毛計算結果も非表示
    const hairRemovalResult = document.getElementById('hairRemovalResult');
    if (hairRemovalResult) {
        hairRemovalResult.style.display = 'none';
    }
    
    // 統合された詳細表示も非表示
    const combinedResult = document.getElementById('combinedResult');
    if (combinedResult) {
        combinedResult.style.display = 'none';
    }
    
    // 固定バーの合計金額もクリア
    const finalTotalBar = document.getElementById('finalTotalBar');
    const finalTotalText = document.getElementById('finalTotalText');
    if (finalTotalBar) {
        finalTotalBar.style.display = 'none';
        finalTotalText.textContent = '合計: ¥0';
    }
    
    // updateSummaryを呼び出して状態を更新
    updateSummary();
    
    // すべての割引チェックボックスをリセット
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    allCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.disabled = false;
    });
    
    // 価格タイプボタンをリセット
    const allPriceButtons = document.querySelectorAll('.price-type-button');
    allPriceButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // 初回価格があるメニューは初回価格を選択状態に
    menuData.forEach((item, index) => {
        const itemId = `menu_${item.category.replace(/\s/g, '_')}_${index}`;
        const firstButton = document.getElementById(`first_${itemId}`);
        const regularButton = document.getElementById(`regular_${itemId}`);
        if (firstButton && !firstButton.disabled) {
            firstButton.classList.add('active');
        } else if (regularButton) {
            regularButton.classList.add('active');
        }
    });
    
    // 割引ラッパーのdisabledクラスを削除
    const discountWrappers = document.querySelectorAll('.discount-checkbox');
    discountWrappers.forEach(wrapper => {
        wrapper.classList.remove('disabled');
    });
}

function toggleTab(tabName) {
    // 全てのタブボタンを非アクティブにする
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active', 'hair-removal-active');
    });
    
    // 全てのコンテンツを非表示にする
    document.getElementById('beauty-content').style.display = 'none';
    document.getElementById('hair-removal-content').style.display = 'none';
    
    // 選択されたタブをアクティブにする
    event.target.classList.add('active');
    
    // 脱毛タブの場合は追加のクラスを付与
    if (tabName === 'hair-removal') {
        event.target.classList.add('hair-removal-active');
    }
    
    // 選択されたコンテンツを表示
    document.getElementById(tabName + '-content').style.display = 'block';
    
    // 脱毛メニューの初期化（初回のみ）
    if (tabName === 'hair-removal' && !window.hairRemovalInitialized) {
        initializeHairRemovalMenuList();
        window.hairRemovalInitialized = true;
    }
}

// 脱毛メニューの初期化
function initializeHairRemovalMenuList() {
    const menuListDiv = document.getElementById('hairRemovalMenuList');
    
    let html = '';
    
    // 女性全身脱毛
    html += '<h3 style="color: #1976d2; margin-top: 20px;">女性 - 全身脱毛</h3>';
    html += `<div class="menu-category">`;
    
    hairRemovalMenuData.female.全身脱毛.forEach((item, index) => {
        const itemId = `hair_female_full_${index}`;
        html += createHairRemovalMenuItem(item, itemId, 'female', '全身脱毛', index);
    });
    
    html += `</div>`;
    
    // 男性全身脱毛
    html += '<h3 style="color: #1976d2; margin-top: 30px;">男性 - 全身脱毛</h3>';
    html += `<div class="menu-category">`;
    
    hairRemovalMenuData.male.全身脱毛.forEach((item, index) => {
        const itemId = `hair_male_full_${index}`;
        html += createHairRemovalMenuItem(item, itemId, 'male', '全身脱毛', index);
    });
    
    html += `</div>`;
    
    // 部分脱毛（男女共通）
    html += '<h3 style="color: #1976d2; margin-top: 30px;">部分脱毛（男女共通）</h3>';
    
    // パーツごとにゾーンを作成
    hairRemovalMenuData.female.部分脱毛.forEach((item, index) => {
        html += `<div class="parts-zone">`;
        html += `<h4 class="parts-zone-title">${item.name} - ¥${item.first.toLocaleString()}（初回） / ¥${item.regular.toLocaleString()}（通常）</h4>`;
        html += `<div class="parts-grid">`;
        
        item.parts.forEach((part, partIndex) => {
            const partId = `hair_part_${index}_${partIndex}`;
            html += `
                <div class="part-item" id="part_item_${partId}">
                    <input type="checkbox" id="${partId}" class="part-checkbox" onchange="togglePartMenu('${partId}', '${part}', ${index})">
                    <label for="${partId}" class="part-label">${part}</label>
                </div>
            `;
        });
        
        html += `</div>`;
        html += `</div>`;
    });
    
    html += ``;
    
    // その他メニュー
    html += '<h3 style="color: #1976d2; margin-top: 30px;">その他</h3>';
    html += `<div class="menu-category">`;
    
    hairRemovalMenuData.その他.forEach((item, index) => {
        const itemId = `hair_other_${index}`;
        html += `
            <div class="menu-item" id="item_${itemId}">
                <div class="menu-item-header">
                    <input type="checkbox" id="${itemId}" onchange="toggleHairRemovalMenu('${itemId}')">
                    <label for="${itemId}" class="menu-item-name">${item.name}</label>
                </div>
                <div class="menu-item-controls">
                    <div class="control-row">
                        <div class="price-display" id="display_${itemId}">
                            ¥${item.regular.toLocaleString()}
                        </div>
                    </div>
                    <button class="add-to-selection-button" onclick="addToSelection('other', 'その他', ${index})" style="margin-top: 10px;">
                        選択に追加
                    </button>
                </div>
            </div>
        `;
    });
    
    html += `</div>`;
    
    menuListDiv.innerHTML = html;
}

// 脱毛メニューアイテムの作成
function createHairRemovalMenuItem(item, itemId, gender, category, index) {
    return `
        <div class="menu-item" id="item_${itemId}">
            <div class="menu-item-header">
                <input type="checkbox" id="${itemId}" onchange="toggleHairRemovalMenu('${itemId}')">
                <label for="${itemId}" class="menu-item-name">
                    ${item.name}
                    ${item.note ? `<span style="font-size: 12px; color: #666;"> - ${item.note}</span>` : ''}
                </label>
            </div>
            <div class="menu-item-controls">
                <div class="control-row">
                    <div class="control-group">
                        <label>価格タイプ</label>
                        <div class="price-type-buttons">
                            <button class="price-type-button active" 
                                    id="first_${itemId}" 
                                    onclick="setHairRemovalPriceType('${itemId}', 'first')">
                                初回価格 ¥${item.first.toLocaleString()}
                            </button>
                            <button class="price-type-button" 
                                    id="regular_${itemId}" 
                                    onclick="setHairRemovalPriceType('${itemId}', 'regular')">
                                通常価格 ¥${item.regular.toLocaleString()}
                            </button>
                        </div>
                    </div>
                    <div class="price-display" id="display_${itemId}">
                        ¥${item.first.toLocaleString()}
                    </div>
                </div>
                <div class="control-row" style="margin-top: 10px;">
                    <div class="control-group">
                        ${item.noon ? `
                        <div style="margin-bottom: 5px;">
                            <span style="font-size: 14px; color: #666;">昼割: </span>
                            <span style="font-weight: bold; color: #ff6b6b;">¥${item.noon.toLocaleString()}</span>
                        </div>
                        ` : ''}
                        ${item.parts ? `
                        <div style="margin-top: 5px; font-size: 12px; color: #666;">
                            含まれる部位: ${item.parts.join('、')}
                        </div>
                        ` : ''}
                        <div style="margin-top: 10px;">
                            <label class="discount-checkbox" style="margin-right: 15px;" id="student_wrapper_${itemId}">
                                <input type="checkbox" id="student_${itemId}" onchange="updateHairRemovalDiscounts('${itemId}', '${gender}', '${category}', ${index})">
                                <span>学生割引</span>
                            </label>
                            <label class="discount-checkbox" style="margin-right: 15px;" id="line_wrapper_${itemId}">
                                <input type="checkbox" id="line_${itemId}" onchange="updateHairRemovalDiscounts('${itemId}', '${gender}', '${category}', ${index})">
                                <span>LINEクーポン</span>
                            </label>
                            ${gender !== 'parts' && item.noon ? `
                            <label class="discount-checkbox" style="margin-right: 15px;" id="noon_wrapper_${itemId}">
                                <input type="checkbox" id="noon_${itemId}" onchange="updateHairRemovalDiscounts('${itemId}', '${gender}', '${category}', ${index})">
                                <span>昼割（16時まで）</span>
                            </label>
                            ` : ''}
                            <label class="discount-checkbox" id="repeat_wrapper_${itemId}">
                                <input type="checkbox" id="repeat_${itemId}" onchange="updateHairRemovalDiscounts('${itemId}', '${gender}', '${category}', ${index})">
                                <span>11回目以降</span>
                            </label>
                            ${item.regular >= 13200 ? `
                            <label class="discount-checkbox" style="margin-right: 15px;" id="coupon_wrapper_${itemId}">
                                <input type="checkbox" id="coupon_${itemId}" onchange="updateHairRemovalDiscounts('${itemId}', '${gender}', '${category}', ${index})">
                                <span>2,200円OFFクーポン</span>
                            </label>
                            ` : ''}
                        </div>
                    </div>
                </div>
                <button class="add-to-selection-button" onclick="addToSelection('${gender}', '${category}', ${index})" style="margin-top: 10px;">
                    選択に追加
                </button>
            </div>
        </div>
    `;
}

// 脱毛メニューの表示切り替え
function toggleHairRemovalMenu(itemId) {
    const checkbox = document.getElementById(itemId);
    const menuItem = document.getElementById(`item_${itemId}`);
    
    if (checkbox.checked) {
        menuItem.classList.add('selected');
        // デフォルトで初回価格を選択
        if (!hairRemovalPriceTypes[itemId]) {
            hairRemovalPriceTypes[itemId] = 'first';
        }
    } else {
        menuItem.classList.remove('selected');
        delete hairRemovalPriceTypes[itemId];
    }
}

// 脱毛メニューの価格タイプ設定
function setHairRemovalPriceType(itemId, priceType) {
    const firstButton = document.getElementById(`first_${itemId}`);
    const regularButton = document.getElementById(`regular_${itemId}`);
    const priceDisplay = document.getElementById(`display_${itemId}`);
    
    // ボタンのアクティブ状態を切り替え
    if (priceType === 'first') {
        firstButton.classList.add('active');
        regularButton.classList.remove('active');
    } else {
        regularButton.classList.add('active');
        firstButton.classList.remove('active');
    }
    
    // 価格タイプを保存
    hairRemovalPriceTypes[itemId] = priceType;
    
    // 価格表示を更新（この時点では元の価格を取得する必要がある）
    // itemIdから元のデータを取得
    let item = null;
    let matches;
    let gender = null;
    let category = null;
    let index = null;
    
    if ((matches = itemId.match(/hair_female_full_(\d+)/))) {
        item = hairRemovalMenuData.female.全身脱毛[parseInt(matches[1])];
        gender = 'female';
        category = '全身脱毛';
        index = parseInt(matches[1]);
    } else if ((matches = itemId.match(/hair_male_full_(\d+)/))) {
        item = hairRemovalMenuData.male.全身脱毛[parseInt(matches[1])];
        gender = 'male';
        category = '全身脱毛';
        index = parseInt(matches[1]);
    }
    
    if (item) {
        const price = priceType === 'first' ? item.first : item.regular;
        priceDisplay.textContent = `¥${price.toLocaleString()}`;
        
        // 初回価格選択時は割引を無効化（初回価格自体が割引なので1施術1割引）
        if (priceType === 'first') {
            const checkboxes = ['student', 'noon', 'repeat', 'coupon', 'line'];
            checkboxes.forEach(type => {
                const checkbox = document.getElementById(`${type}_${itemId}`);
                const wrapper = document.getElementById(`${type}_wrapper_${itemId}`);
                if (checkbox) {
                    checkbox.checked = false;
                    checkbox.disabled = true;
                    if (wrapper) wrapper.classList.add('disabled');
                }
            });
        } else {
            // 通常価格選択時は割引の制御を更新
            updateHairRemovalDiscounts(itemId, gender, category, index);
        }
    }
}

// 部位選択の処理
function togglePartMenu(partId, partName, categoryIndex) {
    const checkbox = document.getElementById(partId);
    const partItem = document.getElementById(`part_item_${partId}`);
    const partsData = hairRemovalMenuData.female.部分脱毛[categoryIndex];
    
    if (checkbox.checked) {
        partItem.classList.add('selected');
        
        // 選択モーダルまたはオプションを表示
        showPartOptions(partName, partsData, partId);
    } else {
        partItem.classList.remove('selected');
        // オプションを非表示
        hidePartOptions(partId);
    }
}

// 部位のオプションを表示
function showPartOptions(partName, partsData, partId) {
    // 既存のオプションがあれば削除
    const existingOptions = document.querySelector(`#part_options_${partId}`);
    if (existingOptions) {
        existingOptions.remove();
    }
    
    // オプション要素を作成
    const optionsHtml = `
        <div id="part_options_${partId}" class="part-options">
            <div class="part-options-content">
                <h5>${partName} - ${partsData.name}</h5>
                <div class="control-group">
                    <label>価格タイプ</label>
                    <div class="price-type-buttons">
                        <button class="price-type-button active" 
                                id="first_${partId}" 
                                onclick="setPartPriceType('${partId}', 'first')">
                            初回価格 ¥${partsData.first.toLocaleString()}
                        </button>
                        <button class="price-type-button" 
                                id="regular_${partId}" 
                                onclick="setPartPriceType('${partId}', 'regular')">
                            通常価格 ¥${partsData.regular.toLocaleString()}
                        </button>
                    </div>
                </div>
                <div class="part-discounts">
                    <label class="discount-checkbox">
                        <input type="checkbox" id="student_${partId}" onchange="updatePartDiscounts('${partId}', '${partName}', ${hairRemovalMenuData.female.部分脱毛.indexOf(partsData)})">
                        <span>学生割引</span>
                    </label>
                    <label class="discount-checkbox">
                        <input type="checkbox" id="line_${partId}" onchange="updatePartDiscounts('${partId}', '${partName}', ${hairRemovalMenuData.female.部分脱毛.indexOf(partsData)})">
                        <span>LINEクーポン</span>
                    </label>
                    <label class="discount-checkbox">
                        <input type="checkbox" id="repeat_${partId}" onchange="updatePartDiscounts('${partId}', '${partName}', ${hairRemovalMenuData.female.部分脱毛.indexOf(partsData)})">
                        <span>11回目以降</span>
                    </label>
                    ${partsData.regular >= 13200 ? `
                    <label class="discount-checkbox">
                        <input type="checkbox" id="coupon_${partId}" onchange="updatePartDiscounts('${partId}', '${partName}', ${hairRemovalMenuData.female.部分脱毛.indexOf(partsData)})">
                        <span>2,200円OFFクーポン</span>
                    </label>
                    ` : ''}
                </div>
                <button class="add-to-selection-button" onclick="addPartToSelection('${partName}', ${hairRemovalMenuData.female.部分脱毛.indexOf(partsData)}, '${partId}')">
                    選択に追加
                </button>
            </div>
        </div>
    `;
    
    // 部位アイテムの後に挿入
    const partItem = document.getElementById(`part_item_${partId}`);
    partItem.insertAdjacentHTML('afterend', optionsHtml);
}

// 部位のオプションを非表示
function hidePartOptions(partId) {
    const options = document.querySelector(`#part_options_${partId}`);
    if (options) {
        options.remove();
    }
    // 価格タイプ情報も削除
    delete hairRemovalPriceTypes[partId];
}

// 部位の価格タイプ設定
function setPartPriceType(partId, priceType) {
    const firstButton = document.getElementById(`first_${partId}`);
    const regularButton = document.getElementById(`regular_${partId}`);
    
    // ボタンのアクティブ状態を切り替え
    if (priceType === 'first') {
        firstButton.classList.add('active');
        regularButton.classList.remove('active');
    } else {
        regularButton.classList.add('active');
        firstButton.classList.remove('active');
    }
    
    // 価格タイプを保存
    hairRemovalPriceTypes[partId] = priceType;
    
    // 初回価格選択時は割引を無効化（初回価格自体が割引なので1施術1割引）
    if (priceType === 'first') {
        const checkboxes = ['student', 'line', 'repeat', 'coupon'];
        checkboxes.forEach(type => {
            const checkbox = document.getElementById(`${type}_${partId}`);
            if (checkbox) {
                checkbox.checked = false;
                checkbox.disabled = true;
            }
        });
    } else {
        // 通常価格選択時は割引を有効化（条件に応じて）
        const partItem = document.getElementById(`part_item_${partId}`);
        const categoryIndex = parseInt(partId.split('_')[2]);
        const partName = partItem.querySelector('.part-label').textContent;
        updatePartDiscounts(partId, partName, categoryIndex);
    }
}

// 脱毛割引の更新と併用制御
function updateHairRemovalDiscounts(itemId, gender, category, index) {
    let item;
    if (gender === 'other') {
        item = hairRemovalMenuData.その他[index];
    } else if (gender === 'parts') {
        item = hairRemovalMenuData.female.部分脱毛[index];
    } else {
        item = hairRemovalMenuData[gender][category][index];
    }
    
    const studentCheckbox = document.getElementById(`student_${itemId}`);
    const noonCheckbox = document.getElementById(`noon_${itemId}`);
    const repeatCheckbox = document.getElementById(`repeat_${itemId}`);
    const couponCheckbox = document.getElementById(`coupon_${itemId}`);
    const lineCheckbox = document.getElementById(`line_${itemId}`);
    
    const studentWrapper = studentCheckbox ? (document.getElementById(`student_wrapper_${itemId}`) || studentCheckbox.closest('.discount-checkbox')) : null;
    const noonWrapper = noonCheckbox ? (document.getElementById(`noon_wrapper_${itemId}`) || noonCheckbox.closest('.discount-checkbox')) : null;
    const repeatWrapper = repeatCheckbox ? (document.getElementById(`repeat_wrapper_${itemId}`) || repeatCheckbox.closest('.discount-checkbox')) : null;
    const couponWrapper = couponCheckbox ? (document.getElementById(`coupon_wrapper_${itemId}`) || couponCheckbox.closest('.discount-checkbox')) : null;
    const lineWrapper = lineCheckbox ? (document.getElementById(`line_wrapper_${itemId}`) || lineCheckbox.closest('.discount-checkbox')) : null;
    
    // 初回価格が選択されている場合はすべての割引を無効化
    const selectedPriceType = hairRemovalPriceTypes[itemId] || 'first';
    if (selectedPriceType === 'first') {
        const checkboxes = [
            {cb: studentCheckbox, wrapper: studentWrapper},
            {cb: noonCheckbox, wrapper: noonWrapper},
            {cb: repeatCheckbox, wrapper: repeatWrapper},
            {cb: couponCheckbox, wrapper: couponWrapper},
            {cb: lineCheckbox, wrapper: lineWrapper}
        ];
        checkboxes.forEach(({cb, wrapper}) => {
            if (cb) {
                cb.checked = false;
                cb.disabled = true;
                if (wrapper) wrapper.classList.add('disabled');
            }
        });
        return;
    }
    
    // LINEクーポンが選択された場合
    if (lineCheckbox && lineCheckbox.checked) {
        // クーポンの使用可能性をチェック
        if (!canUseCoupon('line', 'hairRemoval')) {
            lineCheckbox.checked = false;
            const couponNames = {
                'line': 'LINEクーポン',
                'weekday': '2200円OFFクーポン',
                'repeat': 'リピートクーポン'
            };
            showWarning(`既に${couponNames[usedCouponType]}が使用されています。1会計につき1つのクーポンのみ使用可能です。`);
            return;
        }
        
        // 他の全てのクーポンを解除
        Object.keys(hairRemovalPriceTypes || {}).forEach(id => {
            if (id !== itemId) {
                const otherLineCheckbox = document.getElementById(`line_${id}`);
                const otherCouponCheckbox = document.getElementById(`coupon_${id}`);
                if (otherLineCheckbox && otherLineCheckbox.checked) {
                    otherLineCheckbox.checked = false;
                }
                if (otherCouponCheckbox && otherCouponCheckbox.checked) {
                    otherCouponCheckbox.checked = false;
                }
            }
        });
        
        // 美容施術のクーポンも解除
        Object.keys(selectedMenus).forEach(id => {
            ['weekday', 'line', 'repeat'].forEach(type => {
                const checkbox = document.getElementById(`${type}_${id}`);
                if (checkbox && checkbox.checked) {
                    checkbox.checked = false;
                }
            });
        });
        
        // クーポンタイプを更新
        usedCouponType = 'line';
        usedCouponLocation = 'hairRemoval';
        
        
        // 他の割引が既に選択されているかチェック
        let disabledDiscounts = [];
        
        // 学生割引を無効化（併用不可）
        if (studentCheckbox) {
            if (studentCheckbox.checked) disabledDiscounts.push('学生割引');
            studentCheckbox.checked = false;
            studentCheckbox.disabled = true;
            studentWrapper.classList.add('disabled');
        }
        // 昼割を無効化（併用不可）
        if (noonCheckbox) {
            if (noonCheckbox.checked) disabledDiscounts.push('昼割');
            noonCheckbox.checked = false;
            noonCheckbox.disabled = true;
            noonWrapper.classList.add('disabled');
        }
        // 11回目以降を無効化（併用不可）
        if (repeatCheckbox) {
            if (repeatCheckbox.checked) disabledDiscounts.push('11回目以降');
            repeatCheckbox.checked = false;
            repeatCheckbox.disabled = true;
            repeatWrapper.classList.add('disabled');
        }
        // 2,200円OFFクーポンを無効化（併用不可）
        if (couponCheckbox && couponWrapper) {
            if (couponCheckbox.checked) disabledDiscounts.push('2,200円OFFクーポン');
            couponCheckbox.checked = false;
            couponCheckbox.disabled = true;
            couponWrapper.classList.add('disabled');
            couponWrapper.title = 'LINEクーポンと併用できません';
        }
        
        // 警告メッセージを表示
        if (disabledDiscounts.length > 0) {
            showWarning(`LINEクーポンは${disabledDiscounts.join('、')}と併用できません。`);
        }
        
        // グローバル割引状態を更新
        globalDiscountState.hasDiscount = true;
        globalDiscountState.discountType = 'LINEクーポン';
        globalDiscountState.source = 'hairRemoval';
        
        // 美容施術の割引を全て無効化
        // disableAllBeautyDiscounts(); // クーポンのみ1会計1枚制限
    }
    
    // 学生割引が選択された場合（初回価格選択時も含む）
    if (studentCheckbox && studentCheckbox.checked) {
        let disabledDiscounts = [];
        
        // 同一施術での他の割引を無効化（学割は施術ごとに適用可能）
        if (lineCheckbox) {
            if (lineCheckbox.checked) disabledDiscounts.push('LINEクーポン');
            lineCheckbox.checked = false;
            lineCheckbox.disabled = true;
            lineWrapper.classList.add('disabled');
        }
        if (couponCheckbox) {
            if (couponCheckbox.checked) disabledDiscounts.push('2,200円OFFクーポン');
            couponCheckbox.checked = false;
            couponCheckbox.disabled = true;
            couponWrapper.classList.add('disabled');
        }
        // 昼割も併用不可
        if (noonCheckbox) {
            if (noonCheckbox.checked) disabledDiscounts.push('昼割');
            noonCheckbox.checked = false;
            noonCheckbox.disabled = true;
            noonWrapper.classList.add('disabled');
        }
        if (repeatCheckbox) {
            if (repeatCheckbox.checked) disabledDiscounts.push('11回目以降');
            repeatCheckbox.checked = false;
            repeatCheckbox.disabled = true;
            repeatWrapper.classList.add('disabled');
        }
        
        // 警告メッセージを表示
        if (disabledDiscounts.length > 0) {
            showWarning(`学生割引は${disabledDiscounts.join('、')}と併用できません。`);
        }
    }
    
    // 昼割が選択された場合
    if (noonCheckbox && noonCheckbox.checked) {
        // 昼割は2200円OFFクーポンとのみ併用可能
        // 学割も併用不可
        if (studentCheckbox) {
            studentCheckbox.checked = false;
            studentCheckbox.disabled = true;
            studentWrapper.classList.add('disabled');
        }
        if (lineCheckbox) {
            lineCheckbox.checked = false;
            lineCheckbox.disabled = true;
            lineWrapper.classList.add('disabled');
        }
        if (repeatCheckbox) {
            repeatCheckbox.checked = false;
            repeatCheckbox.disabled = true;
            repeatWrapper.classList.add('disabled');
        }
        // 2200円OFFクーポンは併用可能（すべてのメニューで）
    }
    
    // 11回目以降が選択された場合（初回価格になるため同一施術での割引併用不可）
    if (repeatCheckbox && repeatCheckbox.checked) {
        let disabledDiscounts = [];
        
        // 同一施術での他の割引を無効化（11回目以降は施術ごとに適用可能）
        // 学生割引を無効化
        if (studentCheckbox) {
            if (studentCheckbox.checked) disabledDiscounts.push('学生割引');
            studentCheckbox.checked = false;
            studentCheckbox.disabled = true;
            studentWrapper.classList.add('disabled');
        }
        // LINEクーポンを無効化（その施術自体には適用不可）
        if (lineCheckbox) {
            if (lineCheckbox.checked) disabledDiscounts.push('LINEクーポン');
            lineCheckbox.checked = false;
            lineCheckbox.disabled = true;
            lineWrapper.classList.add('disabled');
        }
        // 昼割を無効化（11回目以降と昼割は併用可能だが、初回価格になるため意味がない）
        if (noonCheckbox) {
            if (noonCheckbox.checked) disabledDiscounts.push('昼割');
            noonCheckbox.checked = false;
            noonCheckbox.disabled = true;
            noonWrapper.classList.add('disabled');
        }
        // 2,200円OFFクーポンを無効化（その施術自体には適用不可）
        if (couponCheckbox) {
            // この施術で2200円OFFが選択されていた場合、クーポンをクリア
            if (couponCheckbox.checked && usedCouponType === 'weekday') {
                clearUsedCoupon();
            }
            couponCheckbox.checked = false;
            couponCheckbox.disabled = true;
            couponWrapper.classList.add('disabled');
        }
        
        // 警告メッセージを表示
        if (disabledDiscounts.length > 0) {
            showWarning(`11回目以降は初回価格のため、その施術では${disabledDiscounts.join('、')}と併用できません。`);
        }
    }
    
    // 2,200円OFFクーポンが選択された場合
    if (couponCheckbox && couponCheckbox.checked) {
        // クーポンの使用可能性をチェック
        if (!canUseCoupon('weekday', 'hairRemoval')) {
            couponCheckbox.checked = false;
            const couponNames = {
                'line': 'LINEクーポン',
                'weekday': '2200円OFFクーポン',  
                'repeat': 'リピートクーポン'
            };
            showWarning(`既に${couponNames[usedCouponType]}が使用されています。1会計につき1つのクーポンのみ使用可能です。`);
            return;
        }
        
        // 他の全てのクーポンを解除
        Object.keys(hairRemovalPriceTypes || {}).forEach(id => {
            if (id !== itemId) {
                const otherCouponCheckbox = document.getElementById(`coupon_${id}`);
                const otherLineCheckbox = document.getElementById(`line_${id}`);
                if (otherCouponCheckbox && otherCouponCheckbox.checked) {
                    otherCouponCheckbox.checked = false;
                }
                if (otherLineCheckbox && otherLineCheckbox.checked) {
                    otherLineCheckbox.checked = false;
                }
            }
        });
        
        // 美容施術のクーポンも解除
        Object.keys(selectedMenus).forEach(id => {
            ['weekday', 'line', 'repeat'].forEach(type => {
                const checkbox = document.getElementById(`${type}_${id}`);
                if (checkbox && checkbox.checked) {
                    checkbox.checked = false;
                }
            });
        });
        
        // クーポンタイプを更新
        usedCouponType = 'weekday';  // 脱毛の2200円OFFは'weekday'として管理
        usedCouponLocation = 'hairRemoval';
        
        // グローバル割引チェック（昼割は除外）
        if (globalDiscountState.hasDiscount && globalDiscountState.source !== 'hairRemoval') {
            couponCheckbox.checked = false;
            showWarning(`美容施術で${globalDiscountState.discountType}が選択されているため、脱毛の割引は適用できません。`);
            return;
        }
        
        let disabledDiscounts = [];
        
        // 昼割以外のすべての割引を無効化（1施術1割引、ただし昼割+2200円OFFは併用可）
        if (studentCheckbox) {
            if (studentCheckbox.checked) disabledDiscounts.push('学生割引');
            studentCheckbox.checked = false;
            studentCheckbox.disabled = true;
            studentWrapper.classList.add('disabled');
        }
        if (lineCheckbox) {
            if (lineCheckbox.checked) disabledDiscounts.push('LINEクーポン');
            lineCheckbox.checked = false;
            lineCheckbox.disabled = true;
            lineWrapper.classList.add('disabled');
            lineWrapper.title = '2,200円OFFクーポンと併用できません';
        }
        if (repeatCheckbox) {
            if (repeatCheckbox.checked) disabledDiscounts.push('11回目以降');
            repeatCheckbox.checked = false;
            repeatCheckbox.disabled = true;
            repeatWrapper.classList.add('disabled');
        }
        // 昼割は併用可能（すべてのメニューで）
        
        // 警告メッセージを表示
        if (disabledDiscounts.length > 0) {
            showWarning(`2,200円OFFクーポンは${disabledDiscounts.join('、')}と併用できません。（昼割とは併用可能です）`);
        }
        
        // グローバル割引状態を更新
        globalDiscountState.hasDiscount = true;
        globalDiscountState.discountType = '2,200円OFFクーポン';
        globalDiscountState.source = 'hairRemoval';
        
        // 美容施術の割引を全て無効化
        // disableAllBeautyDiscounts(); // クーポンのみ1会計1枚制限
    }
    
    // いずれの排他的な割引も選択されていない場合は全て有効化
    if ((!studentCheckbox || !studentCheckbox.checked) && 
        (!couponCheckbox || !couponCheckbox.checked) && 
        (!noonCheckbox || !noonCheckbox.checked) &&
        (!repeatCheckbox || !repeatCheckbox.checked) &&
        (!lineCheckbox || !lineCheckbox.checked)) {
        
        // グローバル割引状態をクリア（脱毛側のクーポンがない場合）
        if (globalDiscountState.source === 'hairRemoval' && 
            (!lineCheckbox || !lineCheckbox.checked) && 
            (!couponCheckbox || !couponCheckbox.checked)) {
            clearGlobalDiscount();
        }
        // クーポン管理もクリア（脱毛側のクーポンがない場合）
        if (usedCouponLocation === 'hairRemoval') {
            clearUsedCoupon();
        }
        if (studentCheckbox) {
            studentCheckbox.disabled = false;
            studentWrapper.classList.remove('disabled');
        }
        if (noonCheckbox) {
            noonCheckbox.disabled = false;
            noonWrapper.classList.remove('disabled');
        }
        if (repeatCheckbox) {
            repeatCheckbox.disabled = false;
            repeatWrapper.classList.remove('disabled');
        }
        if (couponCheckbox) {
            couponCheckbox.disabled = false;
            couponWrapper.classList.remove('disabled');
            couponWrapper.removeAttribute('title');
        }
        if (lineCheckbox) {
            lineCheckbox.disabled = false;
            lineWrapper.classList.remove('disabled');
            lineWrapper.removeAttribute('title');
        }
    } else {
        // LINEクーポンが選択されている場合の特別な処理
        if (lineCheckbox && lineCheckbox.checked) {
            if (couponCheckbox && couponWrapper) {
                couponCheckbox.disabled = true;
                couponWrapper.classList.add('disabled');
            }
            if (studentCheckbox && studentWrapper) {
                studentCheckbox.disabled = true;
                studentWrapper.classList.add('disabled');
            }
            if (noonCheckbox && noonWrapper) {
                noonCheckbox.disabled = true;
                noonWrapper.classList.add('disabled');
            }
            if (repeatCheckbox && repeatWrapper) {
                repeatCheckbox.disabled = true;
                repeatWrapper.classList.add('disabled');
            }
        }
    }
    
    // 現在の選択状態で価格が13,200円未満になる場合はクーポンを無効化
    if (couponCheckbox) {
        let currentPrice = item.regular;
        
        if (noonCheckbox && noonCheckbox.checked && item.noon) {
            currentPrice = item.noon;
        } else if (repeatCheckbox && repeatCheckbox.checked) {
            currentPrice = item.first;
        }
        
        if (currentPrice < 13200) {
            couponCheckbox.checked = false;
            couponCheckbox.disabled = true;
            couponWrapper.classList.add('disabled');
        } else if ((!studentCheckbox || !studentCheckbox.checked) && 
                  (!noonCheckbox || !noonCheckbox.checked)) {
            couponCheckbox.disabled = false;
            couponWrapper.classList.remove('disabled');
        }
    }
}

// 部位の割引更新
function updatePartDiscounts(partId, partName, categoryIndex) {
    const partsData = hairRemovalMenuData.female.部分脱毛[categoryIndex];
    
    const studentCheckbox = document.getElementById(`student_${partId}`);
    const lineCheckbox = document.getElementById(`line_${partId}`);
    const repeatCheckbox = document.getElementById(`repeat_${partId}`);
    const couponCheckbox = document.getElementById(`coupon_${partId}`);
    
    // wrapper要素も取得（部分脱毛では直接label要素を取得）
    const studentWrapper = studentCheckbox ? studentCheckbox.closest('.discount-checkbox') : null;
    const lineWrapper = lineCheckbox ? lineCheckbox.closest('.discount-checkbox') : null;
    const repeatWrapper = repeatCheckbox ? repeatCheckbox.closest('.discount-checkbox') : null;
    const couponWrapper = couponCheckbox ? couponCheckbox.closest('.discount-checkbox') : null;
    
    // LINEクーポンが選択された場合
    if (lineCheckbox && lineCheckbox.checked) {
        // クーポンの使用可能性をチェック
        if (!canUseCoupon('line', 'hairRemoval')) {
            lineCheckbox.checked = false;
            const couponNames = {
                'line': 'LINEクーポン',
                'weekday': '2200円OFFクーポン',
                'repeat': 'リピートクーポン'
            };
            showWarning(`既に${couponNames[usedCouponType]}が使用されています。1会計につき1つのクーポンのみ使用可能です。`);
            return;
        }
        
        // 他の全てのクーポンを解除
        Object.keys(hairRemovalPriceTypes || {}).forEach(id => {
            const otherLineCheckbox = document.getElementById(`line_${id}`);
            const otherCouponCheckbox = document.getElementById(`coupon_${id}`);
            if (otherLineCheckbox && otherLineCheckbox.checked) {
                otherLineCheckbox.checked = false;
            }
            if (otherCouponCheckbox && otherCouponCheckbox.checked) {
                otherCouponCheckbox.checked = false;
            }
        });
        
        // 美容施術のクーポンも解除
        Object.keys(selectedMenus).forEach(id => {
            ['weekday', 'line', 'repeat'].forEach(type => {
                const checkbox = document.getElementById(`${type}_${id}`);
                if (checkbox && checkbox.checked) {
                    checkbox.checked = false;
                }
            });
        });
        
        // クーポンタイプを更新
        usedCouponType = 'line';
        usedCouponLocation = 'hairRemoval';
        
        let disabledDiscounts = [];
        
        if (studentCheckbox) {
            if (studentCheckbox.checked) disabledDiscounts.push('学生割引');
            studentCheckbox.checked = false;
            studentCheckbox.disabled = true;
            if (studentWrapper) studentWrapper.classList.add('disabled');
        }
        if (repeatCheckbox) {
            if (repeatCheckbox.checked) disabledDiscounts.push('11回目以降');
            repeatCheckbox.checked = false;
            repeatCheckbox.disabled = true;
            if (repeatWrapper) repeatWrapper.classList.add('disabled');
        }
        if (couponCheckbox) {
            if (couponCheckbox.checked) disabledDiscounts.push('2,200円OFFクーポン');
            couponCheckbox.checked = false;
            couponCheckbox.disabled = true;
            if (couponWrapper) {
                couponWrapper.classList.add('disabled');
                couponWrapper.title = 'LINEクーポンと併用できません';
            }
        }
        
        // 警告メッセージを表示
        if (disabledDiscounts.length > 0) {
            showWarning(`LINEクーポンは${disabledDiscounts.join('、')}と併用できません。`);
        }
    }
    // 学生割引が選択された場合
    else if (studentCheckbox && studentCheckbox.checked) {
        if (lineCheckbox) {
            lineCheckbox.checked = false;
            lineCheckbox.disabled = true;
            if (lineWrapper) lineWrapper.classList.add('disabled');
        }
        if (couponCheckbox) {
            couponCheckbox.checked = false;
            couponCheckbox.disabled = true;
            if (couponWrapper) couponWrapper.classList.add('disabled');
        }
        if (repeatCheckbox) {
            repeatCheckbox.checked = false;
            repeatCheckbox.disabled = true;
            if (repeatWrapper) repeatWrapper.classList.add('disabled');
        }
    }
    // 11回目以降が選択された場合
    else if (repeatCheckbox && repeatCheckbox.checked) {
        if (studentCheckbox) {
            studentCheckbox.checked = false;
            studentCheckbox.disabled = true;
            if (studentWrapper) studentWrapper.classList.add('disabled');
        }
        if (lineCheckbox) {
            lineCheckbox.checked = false;
            lineCheckbox.disabled = true;
            if (lineWrapper) lineWrapper.classList.add('disabled');
        }
        if (couponCheckbox) {
            couponCheckbox.checked = false;
            couponCheckbox.disabled = true;
            if (couponWrapper) couponWrapper.classList.add('disabled');
        }
    }
    // 2,200円OFFクーポンが選択された場合
    else if (couponCheckbox && couponCheckbox.checked) {
        // 他の施術で2200円OFFクーポンが既に選択されているかチェック
        const otherCouponChecked = Object.keys(hairRemovalPriceTypes).some(id => {
            const otherCouponCheckbox = document.getElementById(`coupon_${id}`);
            return otherCouponCheckbox && otherCouponCheckbox.checked;
        });
        
        // 美容施術で2200円OFFが選択されているかもチェック
        const beautyWeekdayChecked = Object.keys(selectedMenus).some(id => {
            const weekdayCheckbox = document.getElementById(`weekday_${id}`);
            return weekdayCheckbox && weekdayCheckbox.checked;
        });
        
        // 美容施術でLINEクーポンが選択されているかチェック（コメントアウト - 別施術なら併用可能）
        // const beautyLineChecked = Object.keys(selectedMenus).some(id => {
        //     const lineCheckbox = document.getElementById(`line_${id}`);
        //     return lineCheckbox && lineCheckbox.checked;
        // });
        
        if (otherCouponChecked || beautyWeekdayChecked) {
            couponCheckbox.checked = false;
            showWarning('2200円OFFクーポンは1会計につき1つの施術にのみ適用可能です。');
            return;
        }
        
        // if (beautyLineChecked) {
        //     couponCheckbox.checked = false;
        //     showWarning('2200円OFFクーポンは美容施術のLINEクーポンと併用できません。');
        //     return;
        // }
        
        if (studentCheckbox) {
            studentCheckbox.checked = false;
            studentCheckbox.disabled = true;
            if (studentWrapper) studentWrapper.classList.add('disabled');
        }
        if (lineCheckbox) {
            lineCheckbox.checked = false;
            lineCheckbox.disabled = true;
            if (lineWrapper) {
                lineWrapper.classList.add('disabled');
                lineWrapper.title = '2,200円OFFクーポンと併用できません';
            }
        }
        if (repeatCheckbox) {
            repeatCheckbox.checked = false;
            repeatCheckbox.disabled = true;
            if (repeatWrapper) repeatWrapper.classList.add('disabled');
        }
    }
    // いずれも選択されていない場合は全て有効化
    else if ((!studentCheckbox || !studentCheckbox.checked) && 
             (!lineCheckbox || !lineCheckbox.checked) &&
             (!repeatCheckbox || !repeatCheckbox.checked) &&
             (!couponCheckbox || !couponCheckbox.checked)) {
        if (studentCheckbox) {
            studentCheckbox.disabled = false;
            if (studentWrapper) studentWrapper.classList.remove('disabled');
        }
        if (lineCheckbox) {
            lineCheckbox.disabled = false;
            if (lineWrapper) {
                lineWrapper.classList.remove('disabled');
                lineWrapper.removeAttribute('title');
            }
        }
        if (repeatCheckbox) {
            repeatCheckbox.disabled = false;
            if (repeatWrapper) repeatWrapper.classList.remove('disabled');
        }
        if (couponCheckbox && partsData.regular >= 13200) {
            couponCheckbox.disabled = false;
            if (couponWrapper) {
                couponWrapper.classList.remove('disabled');
                couponWrapper.removeAttribute('title');
            }
        }
    }
}

// 部位を選択に追加
function addPartToSelection(partName, categoryIndex, partId) {
    const partsData = hairRemovalMenuData.female.部分脱毛[categoryIndex];
    
    // 割引オプションの取得
    const isStudent = document.getElementById(`student_${partId}`)?.checked || false;
    const isLine = document.getElementById(`line_${partId}`)?.checked || false;
    const isRepeat = document.getElementById(`repeat_${partId}`)?.checked || false;
    const isCoupon = document.getElementById(`coupon_${partId}`)?.checked || false;
    
    // 選択された価格タイプを取得
    const selectedPriceType = hairRemovalPriceTypes[partId] || 'first';
    const basePrice = selectedPriceType === 'first' ? partsData.first : partsData.regular;
    
    // 価格の計算
    let price;
    let priceType;
    
    if (isStudent) {
        price = Math.floor(basePrice / 2);
        priceType = selectedPriceType === 'first' ? '学生割引（初回価格の50%OFF）' : '学生割引（50%OFF）';
    } else if (isRepeat) {
        // 11回目以降は初回価格（クーポン併用不可）
        price = partsData.first;
        priceType = '11回目以降（初回価格）';
    } else if (isCoupon && basePrice >= 13200) {
        price = basePrice - 2200;
        priceType = selectedPriceType === 'first' ? '初回価格 - 2,200円OFFクーポン' : '通常価格 - 2,200円OFFクーポン';
    } else if (isLine) {
        price = partsData.first;
        priceType = 'LINEクーポン（初回価格）';
    } else {
        price = basePrice;
        priceType = selectedPriceType === 'first' ? '初回価格' : '通常価格';
    }
    
    // 既に同じ条件のアイテムが選択されているかチェック
    const existingItem = hairRemovalSelection.find(selectedItem => 
        selectedItem.name === partName &&
        selectedItem.category === partsData.name &&
        selectedItem.priceType === priceType &&
        selectedItem.price === price
    );
    
    let addedItem;
    if (existingItem) {
        existingItem.quantity++;
        addedItem = existingItem;
    } else {
        const selectionItem = {
            id: hairRemovalSelectionId++,
            name: partName,
            category: partsData.name,
            price: price,
            priceType: priceType,
            quantity: 1,
            baseItem: partsData
        };
        
        hairRemovalSelection.push(selectionItem);
        addedItem = selectionItem;
    }
    
    updateSelectionDisplay();
    updateSummary();
    console.log('[addPartToSelection] 選択に追加されました:', addedItem);
    console.log('[addPartToSelection] hairRemovalSelection:', hairRemovalSelection);
    console.log('[addPartToSelection] 現在の脱毛選択数:', hairRemovalSelection.length);
    console.log('[addPartToSelection] 脱毛合計価格:', hairRemovalSelection.reduce((sum, item) => sum + (item.price * item.quantity), 0));
    
    // チェックボックスとオプションをリセット
    document.getElementById(partId).checked = false;
    const partItem = document.getElementById(`part_item_${partId}`);
    partItem.classList.remove('selected');
    hidePartOptions(partId);
}

// 選択に追加
function addToSelection(gender, category, index) {
    let item;
    let itemId;
    
    if (gender === 'other') {
        item = hairRemovalMenuData.その他[index];
        itemId = `hair_other_${index}`;
    } else if (gender === 'parts') {
        // 部分脱毛は女性データを使用（男女共通）
        item = hairRemovalMenuData.female.部分脱毛[index];
        itemId = `hair_parts_${index}`;
    } else {
        item = hairRemovalMenuData[gender][category][index];
        itemId = `hair_${gender}_full_${index}`;
    }
    
    // 割引オプションの取得
    const isStudent = document.getElementById(`student_${itemId}`)?.checked || false;
    const isNoon = document.getElementById(`noon_${itemId}`)?.checked || false;
    const isRepeat = document.getElementById(`repeat_${itemId}`)?.checked || false;
    const isCoupon = document.getElementById(`coupon_${itemId}`)?.checked || false;
    const isLine = document.getElementById(`line_${itemId}`)?.checked || false;
    
    // 選択された価格タイプを取得
    const selectedPriceType = hairRemovalPriceTypes[itemId] || 'first';
    
    // 価格の計算
    let price;
    let priceType;
    let genderLabel = '';
    
    if (gender === 'other') {
        if (isLine) {
            // LINEクーポン（通常価格→初回価格）
            price = item.first;
            priceType = 'LINEクーポン（初回価格）';
        } else {
            price = item.regular;
            priceType = '通常価格';
        }
    } else if (gender === 'parts') {
        // 部分脱毛の場合（性別なし）
        if (isStudent) {
            // 選択された価格タイプの50%OFF
            const basePrice = selectedPriceType === 'first' ? item.first : item.regular;
            price = Math.floor(basePrice / 2);
            priceType = selectedPriceType === 'first' ? '学生割引（初回価格の50%OFF）' : '学生割引（50%OFF）';
        } else if (isRepeat) {
            // 11回目以降は初回価格（クーポン併用不可）
            price = item.first;
            priceType = '11回目以降（初回価格）';
        } else if (isCoupon && item.regular >= 13200) {
            // 通常価格からクーポン適用
            price = item.regular - 2200;
            priceType = '通常価格 - 2,200円OFFクーポン';
        } else if (isLine) {
            // LINEクーポン（通常価格→初回価格）
            price = item.first;
            priceType = 'LINEクーポン（初回価格）';
        } else {
            price = item.first;
            priceType = '初回価格';
        }
    } else {
        genderLabel = gender === 'female' ? '女性' : '男性';
        
        if (isStudent) {
            // 学生割引の場合（初回価格と併用可能、他クーポンとは併用不可）
            const studentData = hairRemovalMenuData.学生割引[gender].find(s => s.name === item.name);
            if (studentData) {
                price = studentData.regular;
                priceType = '学生割引';
            } else {
                // 選択された価格タイプの50%OFF
                const basePrice = selectedPriceType === 'first' ? item.first : item.regular;
                price = Math.floor(basePrice / 2);
                priceType = selectedPriceType === 'first' ? '学生割引（初回価格の50%OFF）' : '学生割引（50%OFF）';
            }
        } else if (isRepeat) {
            // 11回目以降は初回価格（クーポン併用不可）
            price = item.first;
            priceType = '11回目以降（初回価格）';
        } else if (isNoon && item.noon) {
            // 昼割価格
            if (isCoupon && item.noon >= 13200) {
                // 昼割 + クーポン（昼割価格が13,200円以上の場合のみ）
                price = item.noon - 2200;
                priceType = '昼割価格 - 2,200円OFFクーポン';
            } else {
                price = item.noon;
                priceType = '昼割価格';
            }
        } else if (isCoupon && selectedPriceType === 'regular' && item.regular >= 13200) {
            // 通常価格からクーポン適用
            price = item.regular - 2200;
            priceType = '通常価格 - 2,200円OFFクーポン';
        } else if (isCoupon && selectedPriceType === 'first' && item.first >= 13200) {
            // 初回価格からクーポン適用
            price = item.first - 2200;
            priceType = '初回価格 - 2,200円OFFクーポン';
        } else if (isLine) {
            // LINEクーポン（通常価格→初回価格）
            price = item.first;
            priceType = 'LINEクーポン（初回価格）';
        } else {
            // 選択された価格タイプに基づいて価格を設定
            if (selectedPriceType === 'first') {
                price = item.first;
                priceType = '初回価格';
            } else {
                price = item.regular;
                priceType = '通常価格';
            }
        }
    }
    
    // 既に同じ条件のアイテムが選択されているかチェック
    const existingItem = hairRemovalSelection.find(selectedItem => 
        selectedItem.name === item.name &&
        selectedItem.gender === genderLabel &&
        selectedItem.priceType === priceType &&
        selectedItem.price === price
    );
    
    let addedItem;
    if (existingItem) {
        // 既に存在する場合は数量を増やす
        existingItem.quantity++;
        addedItem = existingItem;
    } else {
        // 新規追加
        const selectionItem = {
            id: hairRemovalSelectionId++,
            name: item.name,
            gender: genderLabel,
            category: category,
            price: price,
            priceType: priceType,
            quantity: 1,
            baseItem: item,
            note: item.note,
            parts: item.parts
        };
        
        console.log('[addToSelection] 価格情報:', {
            itemName: item.name,
            calculatedPrice: price,
            priceType: priceType,
            itemData: item
        });
        
        hairRemovalSelection.push(selectionItem);
        addedItem = selectionItem;
    }
    
    updateSelectionDisplay();
    updateSummary();
    console.log('[addToSelection] 選択に追加されました:', addedItem);
    console.log('[addToSelection] hairRemovalSelection:', hairRemovalSelection);
    console.log('[addToSelection] 現在の脱毛選択数:', hairRemovalSelection.length);
    console.log('[addToSelection] 脱毛合計価格:', hairRemovalSelection.reduce((sum, item) => sum + (item.price * item.quantity), 0));
    
    // チェックボックスをリセット
    if (document.getElementById(`student_${itemId}`)) {
        document.getElementById(`student_${itemId}`).checked = false;
    }
    if (document.getElementById(`noon_${itemId}`)) {
        document.getElementById(`noon_${itemId}`).checked = false;
    }
    if (document.getElementById(`repeat_${itemId}`)) {
        document.getElementById(`repeat_${itemId}`).checked = false;
    }
    if (document.getElementById(`coupon_${itemId}`)) {
        document.getElementById(`coupon_${itemId}`).checked = false;
    }
}

// 選択表示の更新
function updateSelectionDisplay() {
    const emptyMessage = document.getElementById('emptySelectionMessage');
    const selectionItems = document.getElementById('selectionItems');
    const selectionSummary = document.getElementById('selectionSummary');
    
    // 要素が存在しない場合は処理をスキップ
    if (!emptyMessage || !selectionItems || !selectionSummary) {
        console.log('[updateSelectionDisplay] 必要な要素が見つかりません。脱毛タブが表示されていない可能性があります。');
        return;
    }
    
    if (hairRemovalSelection.length === 0) {
        emptyMessage.style.display = 'block';
        selectionItems.style.display = 'none';
        selectionSummary.style.display = 'none';
        return;
    }
    
    emptyMessage.style.display = 'none';
    selectionItems.style.display = 'block';
    selectionSummary.style.display = 'block';
    
    let html = '';
    let totalCount = 0;
    let totalPrice = 0;
    
    hairRemovalSelection.forEach(item => {
        totalCount += item.quantity;
        totalPrice += item.price * item.quantity;
        
        html += `
            <div class="selection-item">
                <div class="selection-item-info">
                    <div class="selection-item-name">
                        ${item.gender ? item.gender + ' - ' : ''}${item.name}
                    </div>
                    <div class="selection-item-options">
                        ${item.priceType} - ¥${item.price.toLocaleString()}
                    </div>
                </div>
                <div class="selection-item-controls">
                    <div class="quantity-control">
                        <button class="quantity-button" onclick="updateQuantity(${item.id}, -1)">−</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-button" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <div class="remove-button" onclick="removeFromSelection(${item.id})" title="削除">🗑️</div>
                </div>
            </div>
        `;
    });
    
    selectionItems.innerHTML = html;
    
    const totalCountElement = document.getElementById('selectionTotalCount');
    const totalPriceElement = document.getElementById('selectionTotalPrice');
    
    if (totalCountElement) {
        totalCountElement.textContent = totalCount;
    }
    if (totalPriceElement) {
        totalPriceElement.textContent = totalPrice.toLocaleString();
    }
}

// 数量の更新
function updateQuantity(selectionItemId, change) {
    const item = hairRemovalSelection.find(i => i.id === selectionItemId);
    if (!item) return;
    
    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromSelection(selectionItemId);
    } else {
        updateSelectionDisplay();
        updateSummary(); // 合計金額バーを更新
    }
}

// 選択から削除
function removeFromSelection(selectionItemId) {
    hairRemovalSelection = hairRemovalSelection.filter(item => item.id !== selectionItemId);
    updateSelectionDisplay();
    updateSummary();
}

// 脱毛料金計算
function calculateHairRemovalPrice() {
    if (hairRemovalSelection.length === 0) {
        alert('施術が選択されていません');
        return;
    }
    
    const resultDiv = document.getElementById('hairRemovalResult');
    const detailsDiv = document.getElementById('hairRemovalPriceDetails');
    const finalPriceSpan = document.getElementById('hairRemovalFinalPrice');
    
    let html = '<h4>施術内訳</h4>';
    let totalPrice = 0;
    
    hairRemovalSelection.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        html += `
            <div class="price-item">
                <div>
                    <span>${item.gender ? item.gender + ' - ' : ''}${item.name}</span>
                    <div class="price-item-detail">
                        ${item.priceType} × ${item.quantity}回
                    </div>
                    ${item.note ? `<div class="price-item-detail" style="font-size: 12px;">${item.note}</div>` : ''}
                </div>
                <span>¥${itemTotal.toLocaleString()}</span>
            </div>
        `;
    });
    
    detailsDiv.innerHTML = html;
    finalPriceSpan.textContent = '¥' + totalPrice.toLocaleString();
    resultDiv.style.display = 'block';
}

// 美容施術メニューのリセット
function resetBeauty() {
    // グローバル割引状態をクリア（美容側の割引のみ）
    if (globalDiscountState.source === 'beauty') {
        clearGlobalDiscount();
    }
    // クーポン管理をクリア（美容で使用していた場合）
    if (usedCouponLocation === 'beauty') {
        clearUsedCoupon();
    }
    
    // 美容施術の選択とチェックボックスをクリア
    Object.keys(selectedMenus).forEach(itemId => {
        const checkbox = document.getElementById(itemId);
        if (checkbox) {
            checkbox.checked = false;
            const menuItem = document.getElementById(`item_${itemId}`);
            if (menuItem) {
                menuItem.classList.remove('selected');
            }
        }
        
        // 割引チェックボックスもクリア
        ['weekday', 'line', 'repeat', 'student'].forEach(type => {
            const discountCheckbox = document.getElementById(`${type}_${itemId}`);
            if (discountCheckbox) {
                discountCheckbox.checked = false;
                discountCheckbox.disabled = false;
            }
        });
    });
    
    // 選択メニューをクリア
    selectedMenus = {};
    hasWeekdayDiscount = false;
    hasLineDiscount = false;
    hasStudentDiscount = false;
    hasInmodeRepeatDiscount = false;
    
    // サマリーを更新
    updateSummary();
    
    // 美容施術の価格タイプボタンをリセット
    const beautyPriceButtons = document.querySelectorAll('#beauty-treatments .price-type-button');
    beautyPriceButtons.forEach(button => {
        button.classList.remove('active');
        if (button.textContent === '初回') {
            button.classList.add('active');
        }
    });
    
    // 美容施術の割引可用性を更新
    updateDiscountAvailability();
}

// 脱毛メニューのリセット
function resetHairRemoval() {
    // グローバル割引状態をクリア（脱毛側の割引のみ）
    if (globalDiscountState.source === 'hairRemoval') {
        clearGlobalDiscount();
    }
    // クーポン管理をクリア（脱毛で使用していた場合）
    if (usedCouponLocation === 'hairRemoval') {
        clearUsedCoupon();
    }
    
    // 選択をクリア
    hairRemovalSelection = [];
    hairRemovalSelectionId = 0;
    hairRemovalPriceTypes = {};
    
    // 選択表示を更新
    updateSelectionDisplay();
    
    // 計算結果を非表示
    document.getElementById('hairRemovalResult').style.display = 'none';
    
    // すべてのチェックボックスをリセット
    const allCheckboxes = document.querySelectorAll('#hair-removal-content input[type="checkbox"]');
    allCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.disabled = false;
    });
    
    // 選択状態のメニューアイテムをリセット
    const selectedItems = document.querySelectorAll('#hair-removal-content .menu-item.selected');
    selectedItems.forEach(item => {
        item.classList.remove('selected');
    });
    
    // 部位選択もリセット
    const selectedParts = document.querySelectorAll('#hair-removal-content .part-item.selected');
    selectedParts.forEach(part => {
        part.classList.remove('selected');
    });
    
    // 部位オプションを削除
    const partOptions = document.querySelectorAll('.part-options');
    partOptions.forEach(option => {
        option.remove();
    });
    
    // 割引ラッパーのdisabledクラスを削除
    const discountWrappers = document.querySelectorAll('#hair-removal-content .discount-checkbox');
    discountWrappers.forEach(wrapper => {
        wrapper.classList.remove('disabled');
    });
    
    // 価格タイプボタンをリセット（初回価格をアクティブに）
    const priceTypeButtons = document.querySelectorAll('#hair-removal-content .price-type-button');
    priceTypeButtons.forEach(button => {
        if (button.id.includes('first_')) {
            button.classList.add('active');
        } else if (button.id.includes('regular_')) {
            button.classList.remove('active');
        }
    });
    
    // 統合された詳細表示も非表示
    const combinedResult = document.getElementById('combinedResult');
    if (combinedResult) {
        combinedResult.style.display = 'none';
    }
    
    // updateSummaryを呼び出して状態を更新
    updateSummary();
}

// 詳細表示から美容施術を削除する関数
function removeBeautyItemFromDetail(itemId) {
    // 美容施術の選択を解除
    const checkbox = document.getElementById(itemId);
    if (checkbox) {
        checkbox.checked = false;
        const menuItem = document.getElementById(`item_${itemId}`);
        if (menuItem) {
            menuItem.classList.remove('selected');
        }
    }
    
    // 割引チェックボックスもクリア
    ['weekday', 'line', 'repeat', 'student'].forEach(type => {
        const discountCheckbox = document.getElementById(`${type}_${itemId}`);
        if (discountCheckbox) {
            discountCheckbox.checked = false;
            discountCheckbox.disabled = false;
        }
    });
    
    // selectedMenusから削除
    delete selectedMenus[itemId];
    
    // グローバル状態を更新
    updateDiscountAvailability();
    updateSummary();
    
    // 施術がまだ残っているか確認
    const beautyCount = Object.keys(selectedMenus).length;
    const hairRemovalCount = hairRemovalSelection.length;
    
    if (beautyCount === 0 && hairRemovalCount === 0) {
        // すべての施術が削除された場合は詳細表示を閉じる
        document.getElementById('combinedResult').style.display = 'none';
    } else {
        // まだ施術が残っている場合は詳細表示を更新
        showDetailedPrice();
    }
}

// 詳細表示から脱毛項目を削除する関数
function removeHairRemovalItemFromDetail(itemId) {
    // hairRemovalSelectionから削除
    hairRemovalSelection = hairRemovalSelection.filter(item => item.id !== itemId);
    
    // 表示を更新
    updateSelectionDisplay();
    updateSummary();
    
    // 施術がまだ残っているか確認
    const beautyCount = Object.keys(selectedMenus).length;
    const hairRemovalCount = hairRemovalSelection.length;
    
    if (beautyCount === 0 && hairRemovalCount === 0) {
        // すべての施術が削除された場合は詳細表示を閉じる
        document.getElementById('combinedResult').style.display = 'none';
    } else {
        // まだ施術が残っている場合は詳細表示を更新
        showDetailedPrice();
    }
}

// 詳細な料金を表示する関数
function showDetailedPrice() {
    const beautyCount = Object.keys(selectedMenus).length;
    const hairRemovalCount = hairRemovalSelection.length;
    
    if (beautyCount === 0 && hairRemovalCount === 0) {
        alert('施術メニューを選択してください');
        return;
    }
    
    const combinedResultDiv = document.getElementById('combinedResult');
    const combinedDetailsDiv = document.getElementById('combinedPriceDetails');
    const combinedFinalPriceSpan = document.getElementById('combinedFinalPrice');
    
    let html = '';
    let totalPrice = 0;
    
    // 美容施術の詳細
    if (beautyCount > 0) {
        html += '<div style="margin-bottom: 30px;"><h4 style="color: #d81b60; margin-bottom: 15px;">美容施術</h4>';
        
        Object.entries(selectedMenus).forEach(([itemId, menu]) => {
            const price = menu.currentPrice || 0;
            totalPrice += price;
            
            html += `
                <div class="price-item">
                    <div>
                        <span>${menu.name}</span>
                        <div class="price-item-detail">
                            ${menu.selectedPriceType === 'first' ? '初回価格' : '通常価格'}
                            ${menu.discounts && menu.discounts.length > 0 ? ' - ' + menu.discounts.join(', ') : ''}
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span>¥${price.toLocaleString()}</span>
                        <button onclick="removeBeautyItemFromDetail('${itemId}')" style="background: none; border: none; cursor: pointer; padding: 5px;" title="削除">
                            🗑️
                        </button>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
    }
    
    // 脱毛の詳細
    if (hairRemovalCount > 0) {
        html += '<div style="margin-bottom: 30px;"><h4 style="color: #d81b60; margin-bottom: 15px;">脱毛</h4>';
        
        hairRemovalSelection.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            
            html += `
                <div class="price-item">
                    <div>
                        <span>${item.gender ? item.gender + ' - ' : ''}${item.name}</span>
                        <div class="price-item-detail">
                            ${item.priceType} × ${item.quantity}回
                        </div>
                        ${item.note ? `<div class="price-item-detail" style="font-size: 12px;">${item.note}</div>` : ''}
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span>¥${itemTotal.toLocaleString()}</span>
                        <button onclick="removeHairRemovalItemFromDetail(${item.id})" style="background: none; border: none; cursor: pointer; padding: 5px;" title="削除">
                            🗑️
                        </button>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
    }
    
    combinedDetailsDiv.innerHTML = html;
    combinedFinalPriceSpan.textContent = '¥' + totalPrice.toLocaleString();
    combinedResultDiv.style.display = 'block';
    
    // 他の詳細表示を非表示にする
    const beautyResult = document.getElementById('result');
    const hairRemovalResult = document.getElementById('hairRemovalResult');
    if (beautyResult) beautyResult.style.display = 'none';
    if (hairRemovalResult) hairRemovalResult.style.display = 'none';
    
    // 詳細表示エリアまでスムーズスクロール
    setTimeout(() => {
        combinedResultDiv.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
        });
    }, 100);
}

window.onload = function() {
    initializeMenuList();
};