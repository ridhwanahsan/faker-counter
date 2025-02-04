//  for tab js code
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-item');
    const highlight = document.querySelector('.tab-highlight');
    const panes = document.querySelectorAll('.tab-pane');

    function updateHighlight(activeTab) {
        const { offsetLeft: left, offsetWidth: width } = activeTab;
        highlight.style.width = `${width}px`;
        highlight.style.left = `${left}px`;
    }

    function setActiveTab(tab) {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = document.getElementById(tab.dataset.tab);
        panes.forEach(p => p.classList.remove('active'));
        target.classList.add('active');
        updateHighlight(tab);
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => setActiveTab(tab));
    });

    // Initialize first tab
    const initialTab = document.querySelector('.tab-item.active');
    updateHighlight(initialTab);

    // Handle window resize
    window.addEventListener('resize', () => {
        const activeTab = document.querySelector('.tab-item.active');
        updateHighlight(activeTab);
    });

    // Swipe functionality for mobile
    let touchStartX = 0;
    const contentContainer = document.querySelector('.tab-content-container');

    contentContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].clientX;
    });

    contentContainer.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX;
        const activeIndex = Array.from(tabs).findIndex(t => t.classList.contains('active'));

        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0 && activeIndex > 0) {
                setActiveTab(tabs[activeIndex - 1]);
            } else if (deltaX < 0 && activeIndex < tabs.length - 1) {
                setActiveTab(tabs[activeIndex + 1]);
            }
        }
    });
});
//  jscode stayle 01 card counter start

const countries = {
    BD: { 
        flag: '🇧🇩', 
        names: ['Anika Rahman', 'Sajal Islam', 'Nusrat Jahan', 'Farhan Ahmed', 
               'Sabrina Islam', 'Tahmid Hossain', 'Mahmuda Akter', 'Rafiul Islam',
               'আনিকা রহমান', 'সজল ইসলাম', 'নুসরাত জাহান', 'ফারহান আহমেদ']
    },
    IN: { 
        flag: '🇮🇳', 
        names: ['Arpita Ghosh', 'Rahul Sharma', 'Priya Patel', 'Anushka Sharma',
               'অর্পিতা ঘোষ', 'রাহুল শর্মা', 'প্রিয়া পাটেল', 'অনুষ্কা শর্মা']
    },
    US: { flag: '🇺🇸', names: ['Emma Johnson', 'Liam Smith', 'Olivia Brown'] },
    JP: { flag: '🇯🇵', names: ['Haruto Sato', 'Aoi Takahashi', 'Yui Nakamura'] },
    BR: { flag: '🇧🇷', names: ['Gabriel Silva', 'Ana Oliveira', 'Lucas Santos'] },
    NG: { flag: '🇳🇬', names: ['Chiamaka Adebayo', 'Emeka Nwankwo', 'Zainab Abubakar'] },
    PK: { flag: '🇵🇰', names: ['Ayesha Khan', 'Bilal Ahmed', 'Fatima Raza'] },
    FR: { flag: '🇫🇷', names: ['Léa Dubois', 'Hugo Moreau', 'Camille Laurent'] }
};

const usedNames = new Set();
let currentCycle = [];

function generateName() {
    const countryCodes = Object.keys(countries);
    const country = countryCodes[Math.floor(Math.random() * countryCodes.length)];
    const namePool = countries[country].names.filter(name => !usedNames.has(name));
    
    if (namePool.length === 0) return null;
    
    const name = namePool[Math.floor(Math.random() * namePool.length)];
    usedNames.add(name);
    return { 
        name, 
        country,
        strength: Math.floor(Math.random() * 3) + 1,
        device: Math.random() > 0.5 ? 'mobile' : 'desktop'
    };
}

function updateViewerList() {
    const viewerList = document.querySelector('.viewer-list');
    const viewerCount = document.querySelector('.viewer-count');
    const refreshIcon = document.querySelector('.fa-sync');
    
    viewerCount.textContent = Math.floor(Math.random() * 21) + 25;
    viewerList.innerHTML = '';
    refreshIcon.classList.add('loading-pulse');

    currentCycle = [];
    for (let i = 0; i < 4; i++) {
        const data = generateName();
        if (!data) break;
        currentCycle.push(data);
    }

    currentCycle.forEach((data, index) => {
        const li = document.createElement('li');
        li.className = 'viewer-item';
        li.style.animationDelay = `${index * 0.1}s`;
        
        const connectionBars = Array.from({length: 3}, (_, i) => 
            `<div class="connection-bar ${i < data.strength ? 'active-bar' : ''}"></div>`
        ).join('');

        li.innerHTML = `
            <span class="flag-icon">${countries[data.country].flag}</span>
            <div class="user-info">
                <div class="user-name">${data.name}</div>
                <div class="user-location">
                    ${data.country}
                    <div class="connection-strength">
                        ${connectionBars}
                    </div>
                </div>
            </div>
            <i class="fas fa-${data.device === 'mobile' ? 'mobile-alt' : 'desktop'} device-icon"></i>
        `;
        viewerList.appendChild(li);
    });

    setTimeout(() => refreshIcon.classList.remove('loading-pulse'), 1000);
}

// Initial load
updateViewerList();

// Update cycle with random intervals
setInterval(() => {
    usedNames.clear();
    updateViewerList();
}, 18000 + Math.random() * 7000);

// Manual refresh with physics-based animation
document.querySelector('.refresh-indicator').addEventListener('click', () => {
    usedNames.clear();
    updateViewerList();
});

// Add connection animation
setInterval(() => {
    document.querySelectorAll('.connection-bar').forEach(bar => {
        if(bar.classList.contains('active-bar')) {
            bar.style.animation = 'connectionPulse 1.2s infinite';
        }
    });
}, 1000);

//  jscode stayle 01 card counter end

//  jscode stayle 02 card counter start
function fakeNameGeneratorCounter01() {
    // (JavaScript remains the same as original, only CSS changes)
const randomNumbers = [20, 30, 40, 16, 25, 32];
const firstNames = ["John", "Jane", "Michael", "Sarah", "David", "Emily", "Daniel", "Emma", "James", "Olivia", "Noah", "Ava", "Liam", "Sophia", "William", "Isabella", "Benjamin", "Mia", "Lucas", "Amelia"];
const lastNames = ["Smith", "Johnson", "Brown", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Robinson", "Clark", "Rodriguez", "Lewis", "Walker", "Hall", "Allen", "Young"];
const usedNames = new Set();

function generateFullName() {
  const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${fName} ${lName}`;
}

function getUniqueName() {
  let name = generateFullName();
  while (usedNames.has(name)) name = generateFullName();
  usedNames.add(name);
  return name;
}

function updateDisplay() {
  const randomNumberEl = document.getElementById("randomNumber-01");
  const namesEl = document.getElementById("names-01");
  const randomValue = randomNumbers[Math.floor(Math.random() * randomNumbers.length)];
  randomNumberEl.textContent = randomValue;
  namesEl.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("name-01");
    nameDiv.style.animationDelay = `${i * 0.1}s`;
    nameDiv.textContent = getUniqueName();
    namesEl.appendChild(nameDiv);
  }

  const dotsDiv = document.createElement("div");
  dotsDiv.classList.add("dots-01");
  dotsDiv.textContent = "...";
  namesEl.appendChild(dotsDiv);
}

updateDisplay();
setInterval(updateDisplay, 3000);

};
fakeNameGeneratorCounter01();

function fakeNameGeneratorCounter02(){
    const randomNumbers = [20, 30, 40, 16, 25, 32];
    const usedNames = new Set();
    let lastUpdate = 0;
    
    const nameDatabase = {
      bengali: {
        first: ["Aarav", "Anika", "Arjun", "Barsha", "Chandan", "Debanga", "Farhan", "Ishita", "Jhinuk", "Koyel", "Lipika", "Mainak", "Nandini", "Parthiv", "Ritwick", "Sohini", "Tanisha", "Utsav", "Yash", "Zinnia"],
        last: ["Banerjee", "Bhattacharjee", "Bose", "Chakraborty", "Das", "Dutta", "Ganguly", "Ghosh", "Guha", "Kar", "Kundu", "Majumdar", "Mitra", "Mukherjee", "Roy", "Saha", "Sanyal", "Sen", "Sinha", "Tagore"]
      },
      bangladeshi: {
        first: ["Arafat", "Bristy", "Chomok", "Dalia", "Emon", "Fahad", "Hasib", "Jannat", "Khalid", "Lubaba", "Mahin", "Nusrat", "Omar", "Prova", "Rafiq", "Sabrina", "Tahsin", "Umme", "Yasmin", "Zahir"],
        last: ["Ahmed", "Akter", "Ali", "Chowdhury", "Haque", "Hasan", "Hossain", "Islam", "Khan", "Mahmud", "Miah", "Rahman", "Sarker", "Siddique", "Uddin"]
      },
      indian: {
        first: ["Aarush", "Aditi", "Arnav", "Diya", "Esha", "Gautam", "Ishaan", "Kavya", "Mohit", "Neha", "Omkar", "Priya", "Rahul", "Sanya", "Tanmay", "Urvashi", "Vivaan", "Zoya"],
        last: ["Agarwal", "Bhatia", "Chopra", "Deshpande", "Gandhi", "Iyer", "Joshi", "Kapoor", "Mehta", "Patel", "Rao", "Sharma", "Singh", "Trivedi", "Verma"]
      },
      us_canadian: {
        first: ["Emma", "Liam", "Olivia", "Noah", "Ava", "William", "Sophia", "James", "Isabella", "Benjamin", "Mia", "Lucas", "Charlotte", "Henry", "Amelia"],
        last: ["Smith", "Johnson", "Brown", "Taylor", "Anderson", "Thomas", "Lee", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez"]
      },
      russian: {
        first: ["Alexei", "Anastasia", "Dmitri", "Ekaterina", "Fyodor", "Irina", "Ivan", "Katya", "Larisa", "Mikhail", "Natalia", "Oleg", "Olga", "Pavel", "Svetlana", "Tatiana", "Vadim", "Valentina", "Viktor", "Yulia"],
        last: ["Ivanov", "Smirnov", "Kuznetsov", "Popov", "Vasiliev", "Petrov", "Sokolov", "Mikhailov", "Fedorov", "Morozov", "Volkov", "Alexeev", "Lebedev", "Semenov", "Pavlov", "Kozlov", "Stepanov", "Nikolaev", "Orlov", "Romanov"]
      }
    };
    
    function getRandomName() {
      const regions = Object.keys(nameDatabase);
      const randomRegion = regions[Math.floor(Math.random() * regions.length)];
      const regionData = nameDatabase[randomRegion];
      
      const firstName = regionData.first[Math.floor(Math.random() * regionData.first.length)];
      const lastName = regionData.last[Math.floor(Math.random() * regionData.last.length)];
      
      return {
        name: `${firstName} ${lastName}`,
        region: randomRegion
      };
    }
    
    function getUniqueName() {
      let tries = 0;
      while (tries < 100) {
        const {name, region} = getRandomName();
        if (!usedNames.has(name)) {
          usedNames.add(name);
          return {name, region};
        }
        tries++;
      }
      usedNames.clear();
      return getRandomName();
    }
    
    function updateDisplay() {
      const now = Date.now();
      if (now - lastUpdate < 25000) return;
      lastUpdate = now;
    
      const randomNumberEl = document.getElementById("randomNumber-3");
      const namesEl = document.getElementById("names-3");
      const randomValue = randomNumbers[Math.floor(Math.random() * randomNumbers.length)];
      
      randomNumberEl.textContent = randomValue;
      namesEl.innerHTML = '';
    
      for (let i = 0; i < 3; i++) {
        const {name, region} = getUniqueName();
        const nameDiv = document.createElement("div");
        nameDiv.classList.add("name-3");
        nameDiv.innerHTML = `
          ${name} 
          <small style="opacity:0.7; font-size:0.8em">(${region.toUpperCase()})</small>
        `;
        nameDiv.style.animationDelay = `${i * 0.1}s`;
        namesEl.appendChild(nameDiv);
      }
    
      const dotsDiv = document.createElement("div");
      dotsDiv.classList.add("dots-3");
      dotsDiv.textContent = "...";
      namesEl.appendChild(dotsDiv);
    }
    
    updateDisplay();
    setInterval(() => {
      const delay = 27000 + Math.random() * 3000;
      setTimeout(updateDisplay, delay);
    }, 30000);
    
    setInterval(updateDisplay, 30000);
}
fakeNameGeneratorCounter02();
//  jscode stayle 02 card counter end
//  jscode stayle 03 card counter end
