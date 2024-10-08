document.addEventListener('DOMContentLoaded', function () {
  const kitGroups = document.querySelectorAll('.kit-group');
  kitGroups.forEach(group => {
    codeTabs(group);
  });
  includeHTML();
  accordion('.accordion-wrap .btn-accordion', '.accordion-wrap .content-body');
  backButton('.btn-prevlink')
});


// 코드펜
function codeTabs(kitGroup) {
  const codeBox = kitGroup.querySelector('.kit-code-box');
  const tabButtons = kitGroup.querySelectorAll('.tab-button');

  tabButtons.forEach(button => {
    button.addEventListener('click', function () {
      const tab = this.dataset.tab;
      const viewBox = kitGroup.querySelector('.kit-view-box');
      if (tab === 'html') {
        const clonedViewBox = viewBox.cloneNode(true);
        clonedViewBox.querySelectorAll('style, script').forEach(el => el.remove());

        clonedViewBox.querySelectorAll('*').forEach(el => el.removeAttribute('style'));

        codeBox.value = clonedViewBox.innerHTML;
      } else if (tab === 'css') {
        const styleTag = viewBox.querySelector('style');
        codeBox.value = styleTag ? styleTag.innerHTML : '';
      } else if (tab === 'js') {
        const scriptTag = viewBox.querySelector('script');
        codeBox.value = scriptTag ? scriptTag.innerHTML : '';
      }

      // 코드에 구문 강조 적용
      const highlightedCode = hljs.highlightAuto(codeBox.value).value;
      codeBox.innerHTML = `<pre><code class="hljs">${highlightedCode}</code></pre>`;
    });
  });

  // 초기 탭 설정
  const initialTab = kitGroup.querySelector('.tab-button[data-tab="html"]');
  if (initialTab) {
    initialTab.click();
  }

  // 복사 버튼 클릭 시 kit-code-box의 내용을 클립보드에 복사
  kitGroup.querySelector('.copy-button').addEventListener('click', function () {
    const codeElement = codeBox.querySelector('code');
    if (codeElement) {
      const range = document.createRange();
      range.selectNodeContents(codeElement);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');
      alert('코드가 복사되었습니다!');
    }
  });
}

// aside start
function includeHTML() {
  var allElements = document.getElementsByTagName('*');
  Array.prototype.forEach.call(allElements, function (el) {
    var includePath = el.dataset.includePath;
    if (includePath) {
      // 경로를 동적으로 설정
      var path = window.location.hostname === "192.168.0.7" ? includePath : "/Components" + includePath;
      
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          el.innerHTML = this.responseText;

          // includeHTML이 완료된 후 링크를 동적으로 설정
          setDynamicLinks();
          SearchBtn();
        }
      };
      xhttp.open('GET', path, true);
      xhttp.send();
    }
  });
}
// 검색 버튼
function SearchBtn() {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');

  if (searchInput && searchButton) {
    searchButton.addEventListener('click', function () {
      const query = searchInput.value;
      let searchPath = "/search.html?query=" + encodeURIComponent(query);
      if (window.location.hostname !== "192.168.0.7") {
        searchPath = "/Components" + searchPath;
      }
      window.location.href = searchPath;
    });
  }
}
//git == local 경로
function setDynamicLinks() {
  const links = document.querySelectorAll('.git-link');
  links.forEach(link => {
    if (window.location.hostname === "192.168.0.7") {
      link.href = link.getAttribute('href');
    } else {
      link.href = "/Components" + link.getAttribute('href');
    }
  });
}
// aside end

// 아코디언 드롭다운
function accordion(accordionBtnSelector, accordionContentSelector) {
  const accordionBtns = document.querySelectorAll(accordionBtnSelector);
  const accordionContents = document.querySelectorAll(accordionContentSelector);

  accordionBtns.forEach((el, idx) => {
    el.addEventListener('click', () => {
      const isActive = el.classList.contains('on');

      accordionBtns.forEach((btn) => {
        btn.classList.remove('on');
      });
      accordionContents.forEach((content) => {
        content.classList.remove('on');
      });

      if (!isActive) {
        el.classList.add('on');
        accordionContents[idx].classList.add('on');
      }
    });
  });
}

// 뒤로가기
function backButton(buttonSelector) {
  const backButton = document.querySelector(buttonSelector);

  if (backButton) {
    backButton.addEventListener('click', function () {
      history.back();
    });
  }
}

