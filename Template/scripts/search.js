

const renderSearchListener = async () => {

    const resultWrapper = document.querySelector(`section:nth-child(3)`);
    resultWrapper.classList.remove(`d-none`);

    const contentWrapperRef = document.querySelector(`section:nth-child(4)`);
    contentWrapperRef.innerHTML = ``;

    const popularCardContainerRef = document.querySelector(`section:nth-child(5)`);
    popularCardContainerRef.innerHTML = ``;

}


export { renderSearchListener };