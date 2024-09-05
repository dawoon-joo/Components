document.addEventListener('DOMContentLoaded', function () {
  common.sub();
});

let common = {
  sub: ()=> {
    const kitGroups = document.querySelectorAll('.kit-group');
    kitGroups.forEach(group => {
      codeTabs(group);
    });
    includeHTML();
  }
}

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
    });
  });

  // 초기 탭 설정
  const initialTab = kitGroup.querySelector('.tab-button[data-tab="html"]');
  if (initialTab) {
    initialTab.click();
  }

  // 복사 버튼 클릭 시 kit-code-box의 내용을 클립보드에 복사
  kitGroup.querySelector('.copy-button').addEventListener('click', function () {
    codeBox.select();
    document.execCommand('copy');
    alert('코드가 복사되었습니다!');
  });
}
// 인클루드
function includeHTML() {
  const elements = document.querySelectorAll('[data-include]');
  elements.forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(response => {
        if (response.ok) return response.text();
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        el.outerHTML = data;
      })
      .catch(error => {
        console.error('Error fetching the file:', error);
      });
  });
}
