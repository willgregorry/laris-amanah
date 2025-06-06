import { Form } from 'react-bootstrap';

export default function DateFilter({ filter, onFilterChange }) {

  const months = [
    { value: '1', label: 'Januari' },
    { value: '2', label: 'Februari' },
    { value: '3', label: 'Maret' },
    { value: '4', label: 'April' },
    { value: '5', label: 'Mei' },
    { value: '6', label: 'Juni' },
    { value: '7', label: 'Juli' },
    { value: '8', label: 'Agustus' },
    { value: '9', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
  ];

  const years = ['2025', '2024', '2023'];

  const days = ['all', ...Array.from({ length: 31 }, (_, i) => i + 1)];

  return (
    <div className="d-flex gap-2">
      
      {}
      <Form.Select 
        name="day" 
        value={filter.day} 
        onChange={onFilterChange} 
        style={{ minWidth: '100px' }}
        aria-label="Pilih Tanggal"
      >
        {days.map(day => (
          <option key={day} value={day}>
            {day === 'all' ? 'Semua Tanggal' : day}
          </option>
        ))}
      </Form.Select>

      {}
      <Form.Select 
        name="month" 
        value={filter.month} 
        onChange={onFilterChange} 
        style={{ minWidth: '100px' }}
        aria-label="Pilih Bulan"
      >
        {months.map(month => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </Form.Select>

      {}
      <Form.Select 
        name="year" 
        value={filter.year} 
        onChange={onFilterChange} 
        style={{ minWidth: '100px' }}
        aria-label="Pilih Tahun"
      >
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Form.Select>

    </div>
  );
}