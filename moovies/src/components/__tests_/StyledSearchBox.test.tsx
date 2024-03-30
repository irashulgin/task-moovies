import { render, fireEvent } from '@testing-library/react';
import StyledSearchBox from '../StyledSearchBox';


describe('StyledSearchBox component', () => {
  test('renders search box with placeholder', () => {
    const { getByPlaceholderText } = render(<StyledSearchBox value="" onChange={() => {}} />);
    const searchBox = getByPlaceholderText('Search...');
    expect(searchBox).toBeInTheDocument();
  });

  test('updates search term when typing in the input field', () => {
    const onChangeMock = jest.fn();
    const { getByPlaceholderText } = render(<StyledSearchBox value="" onChange={onChangeMock} />);
    const searchBox = getByPlaceholderText('Search...');
    fireEvent.change(searchBox, { target: { value: 'Test' } });
    expect(onChangeMock).toHaveBeenCalledWith('Test');
  });

  test('clears search term when clear button is clicked', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<StyledSearchBox value="Test" onChange={onChangeMock} />);
    const clearButton = getByTestId('clear-button');
    fireEvent.click(clearButton);
    expect(onChangeMock).toHaveBeenCalledWith('');
  });
});
