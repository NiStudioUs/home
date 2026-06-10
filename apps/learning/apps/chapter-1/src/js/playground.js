document.addEventListener('DOMContentLoaded', () => {
    // 1. Typing
    const textInput = document.getElementById('text-input');
    const textOutput = document.getElementById('text-output');
    textInput.addEventListener('input', (e) => {
        textOutput.textContent = e.target.value;
    });

    // 2. Mouse Actions
    const hoverBox = document.getElementById('hover-box');
    const dblclickBox = document.getElementById('dblclick-box');
    const mouseOutput = document.getElementById('mouse-output');

    hoverBox.addEventListener('mouseenter', () => {
        mouseOutput.textContent = 'Hovered!';
    });
    hoverBox.addEventListener('mouseleave', () => {
        mouseOutput.textContent = '';
    });

    dblclickBox.addEventListener('dblclick', () => {
        mouseOutput.textContent = 'Double Clicked!';
    });

    // 4. Select Dropdown
    const selectBox = document.getElementById('country-select');
    const selectOutput = document.getElementById('select-output');
    selectBox.addEventListener('change', (e) => {
        const text = e.target.options[e.target.selectedIndex].text;
        selectOutput.textContent = text;
    });

    // 5. Scroll Button
    const scrollBtn = document.getElementById('scroll-btn');
    const scrollOutput = document.getElementById('scroll-output');
    scrollBtn.addEventListener('click', () => {
        scrollOutput.textContent = 'Button at bottom clicked!';
    });
});
