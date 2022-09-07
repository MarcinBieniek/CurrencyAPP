import { render, screen, cleanup } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';

  describe('Component ResultBox', () => {

    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100}/> );
    })

    const testCasesPLNtoUSD = [
        { amount: 100, result: 'PLN 100.00 = $28.57' },
        { amount: 20, result: 'PLN 20.00 = $5.71'},
        { amount: 200, result: 'PLN 200.00 = $57.14'},
        { amount: 345, result: 'PLN 345.00 = $98.57'},
    ];

    const testCasesUSDtoPLN = [
        { amount: 100, result: '$100.00 = PLN 350.00' },
        { amount: 200, result: '$200.00 = PLN 700.00' },
        { amount: 150, result: '$150.00 = PLN 525.00' },
        { amount: 17, result: '$17.00 = PLN 59.50' },
    ];

    for(const testObj of testCasesPLNtoUSD) {  
        it('should render proper info about conversion when PLN -> USD', () => {
            // render component
            render(<ResultBox from="PLN" to="USD" amount={testObj.amount}/> );
            // find in component main div 
            const mainDiv = screen.getByTestId('mainDiv');
            // expect correct output data
            expect(mainDiv).toHaveTextContent(testObj.result);
        })   
    // unmount component
    cleanup()
    }

    for(const testObj of testCasesUSDtoPLN) {  
        it('should render proper info about conversion when USD -> PLN', () => {
            // render component
            render(<ResultBox from="USD" to="PLN" amount={testObj.amount}/> );
            // find in component main div 
            const mainDiv = screen.getByTestId('mainDiv');
            // expect correct output data
            expect(mainDiv).toHaveTextContent(testObj.result);
        })   
    // unmount component
    cleanup()
    }

    it('should render equal value when user choose PLN -> PLN', () => {
        // render component
        render(<ResultBox from="PLN" to="PLN" amount={100}/> );
        // find in component main div 
        const mainDiv = screen.getByTestId('mainDiv');
        // expect correct output data
        expect(mainDiv).toHaveTextContent('PLN 100.00 = PLN 100.00');
    })   

    it('should render equal value when user choose USD -> USD', () => {
        // render component
        render(<ResultBox from="USD" to="USD" amount={100}/> );
        // find in component main div 
        const mainDiv = screen.getByTestId('mainDiv');
        // expect correct output data
        expect(mainDiv).toHaveTextContent('$100.00 = $100.00');
    })

    it('should render error when amount is lower than 0', () => {
        render(<ResultBox from="PLN" to="USD" amount={-1} />);
        const output = screen.getByTestId('errorDiv');
        expect(output).toHaveTextContent(`Wrong value`);
    }); 


});