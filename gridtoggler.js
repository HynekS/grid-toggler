//@ts-check;
;
const gridToggler = (() => {
    
    'use strict';
    
    const config = {
        targetX: '#grid',
        targetY: '#grid',
        gridGapX: 24,
        gridGapY: 24,
        gridTiltX: 0,
        gridTiltY: 18,
        gridColor: 'rgba(50, 154, 240, 1)',
    }

    const queryX = document.querySelectorAll(config.targetX);
    const queryY = document.querySelectorAll(config.targetY);

    const styleSheet =  [
                            `.gt {
                                display: inline-block;
                                position: fixed;
                                right: 2rem;
                                top: 1rem;
                                box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, .3);
                            }`,
                            `.gt__btn {
                                display: inline-block;
                                padding: 1rem 2rem 1rem 2rem;
                                position: relative;
                                border:1px solid #aeaeae;
                                background: linear-gradient(0deg, #e1e1e1, #fefefe);
                                background-repeat: no-repeat;
                                line-height: 28px;
                                cursor: pointer;
                            }`,
                            `.gt__btn:focus {
                                outline: none;
                            }`,
                            `.gt__btn::before {
                                content: "";
                                position: absolute;
                                top: 0;
                                left: 0;
                                bottom: 0;
                                right: 0;
                                margin: auto;
                                width: 15px;
                                height: 15px;    
                            }`,
                            `.gt__btn--x::before {
                                background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='15px' height='15px' viewBox='0 0 15 15' enable-background='new 0 0 15 15'%3E%3Cpath d='M13 0H14V15H13zM9 0H10V15H9zM5 0H6V15H5zM1 0H2V15H1z'/%3E%3C/svg%3E");
                            }`,
                            `.gt__btn--y::before {
                                background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='15px' height='15px' viewBox='0 0 15 15' enable-background='new 0 0 15 15'%3E%3Cpath d='M0 1H15V2H0zM0 5H15V6H0zM0 9H15V10H0zM0 13H15V14H0z'/%3E%3C/svg%3E");
                            }`,
                            `.gt__btn--active {
                                background: linear-gradient(0deg, #cbcbcb, #cecece);
                                box-shadow: 0 0 10px rgba(0, 0, 0, .1) inset;
                            }`,
                            `.gridX--active {
                                background-image: repeating-linear-gradient(
                                    90deg,
                                    transparent,
                                    transparent ${config.gridGapX -1}px,
                                    ${config.gridColor} ${config.gridGapX -1}px,
                                    ${config.gridColor} ${config.gridGapX}px
                                );
                                background-position-x: ${config.gridTiltX}px;
                            }`,
                            `.gridY--active {
                                background-image: repeating-linear-gradient(
                                    0deg,
                                    transparent,
                                    transparent ${config.gridGapY -1}px,
                                    ${config.gridColor} ${config.gridGapY -1}px,
                                    ${config.gridColor} ${config.gridGapY}px
                                );
                                background-position-y: ${config.gridTiltY}px;
                            }`,
                            `.gridX--active.gridY--active {
                                background-image: repeating-linear-gradient(
                                    90deg,
                                    transparent,
                                    transparent ${config.gridGapX -1}px,
                                    ${config.gridColor} ${config.gridGapX -1}px,
                                    ${config.gridColor} ${config.gridGapX}px
                                ),
                                repeating-linear-gradient(
                                    0deg,
                                    transparent,
                                    transparent ${config.gridGapY -1}px,
                                    ${config.gridColor} ${config.gridGapY -1}px,
                                    ${config.gridColor} ${config.gridGapY}px
                                )
                            }`,
						];

    const sheet = (function() {
        const style = document.createElement('style');
        style.appendChild(document.createTextNode(''));
        document.head.appendChild(style);
        
        styleSheet.forEach(function(rule, index){
			style.sheet.insertRule(rule, index);
        });

        return style.sheet;

    }());

    const toggleX = (e) => {
        toggle(queryX, 'gridX--active', e);
    }

    const toggleY = (e) => {
        toggle(queryY, 'gridY--active', e);
    }

    const toggle = (query, className, e) => {
        e.target.classList.toggle('gt__btn--active');
        if(!query.length) {
            console.warn(
                `We are sorry, but the toggleGrid script couldn't find any elements with given attributes.
                Please, check the config object on top of "gridtoggler.js" file.
                If you think this is a bug, please report.`
            );
            return;
        }
        return (() => {
            [...query].forEach((elm) => {
                elm.classList.toggle(className);
            });
        })();
    }

    const createElements = (() => {
		const rootElement = document.createElement('div');
        rootElement.classList.add('gt');
        
        const Xbtn = document.createElement('button');
        Xbtn.classList.add('gt__btn', 'gt__btn--x');
        Xbtn.addEventListener('click', (e) => { toggleX(e); }, false);

        const Ybtn = document.createElement('button');
        Ybtn.classList.add('gt__btn', 'gt__btn--y')
        Ybtn.addEventListener('click', (e) => { toggleY(e); }, false);

        /**
        *   Adding feature
        **/

        document.body.appendChild(rootElement);
        rootElement.appendChild(Xbtn);
        rootElement.appendChild(Ybtn);
	})();
})

window.addEventListener('load', gridToggler, false);