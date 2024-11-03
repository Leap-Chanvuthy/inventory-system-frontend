import React from 'react';
import './GenerateInvoice.css';

const GenerateInvoice = ({ invoice }) => (
  <div className="invoice-container">
    <h1 className="invoice-title">Invoice #{invoice.invoice_number}</h1>
    <div className="invoice-info">
      <p><strong>Date:</strong> {new Date(invoice.payment_date).toLocaleDateString()}</p>
      <p><strong>Status:</strong> <span className={`status ${invoice.status.toLowerCase()}`}>{invoice.status}</span></p>
      <p><strong>Payment Method:</strong> {invoice.payment_method}</p>
    </div>

    <h2 className="section-title">Invoice Summary</h2>
    <ul className="invoice-summary">
      {/* <li><strong>Subtotal (Riel):</strong> {invoice.sub_total_in_riel.toFixed(2)} ៛</li>
      <li><strong>Subtotal (USD):</strong> ${invoice.sub_total_in_usd.toFixed(2)}</li> */}
      <li><strong>Discount ({invoice.discount_percentage}%):</strong> -{invoice.discount_value_in_usd.toFixed(2)} $ / -{invoice.discount_value_in_riel.toFixed(2)} ៛</li>
      <li><strong>Tax ({invoice.tax_percentage}%):</strong> +{invoice.tax_value_in_usd.toFixed(2)} $ / +{invoice.tax_value_in_riel.toFixed(2)} ៛</li>
      {/* <li><strong>Grand Total Without Tax (Riel):</strong> {invoice.grand_total_without_tax_in_riel.toFixed(2)} ៛</li>
      <li><strong>Grand Total Without Tax (USD):</strong> ${invoice.grand_total_without_tax_in_usd.toFixed(2)}</li>
      <li><strong>Grand Total With Tax (Riel):</strong> {invoice.grand_total_with_tax_in_riel.toFixed(2)} ៛</li>
      <li><strong>Grand Total With Tax (USD):</strong> ${invoice.grand_total_with_tax_in_usd.toFixed(2)}</li> */}
      <li><strong>Clearing Payable Percentage:</strong> {invoice.clearing_payable_percentage}%</li>
      <li><strong>Indebted (Riel):</strong> {invoice.indebted_in_riel.toFixed(2)} ៛</li>
      <li><strong>Indebted (USD):</strong> ${invoice.indebted_in_usd.toFixed(2)}</li>
    </ul>

    <h2 className="section-title">Invoice Details</h2>
    <table className="invoice-table">
      <thead>
        <tr>
          <th>Qty</th>
          <th>Item Name</th>
          <th>Supplier</th>
          <th>Unit Price (Riel)</th>
          <th>Total Price (Riel)</th>
          <th>Unit Price (USD)</th>
          <th>Total Price (USD)</th>
        </tr>
      </thead>
      <tbody>
        {invoice.purchase_invoice_details.map((item) => (
          <tr key={item.id}>
            <td>{item.quantity}</td>
            <td>{item.raw_material.name}</td>
            <td>{item.raw_material.supplier.name}</td>
            <td>{item.raw_material.unit_price_in_riel.toFixed(2)} ៛</td>
            <td>{item.total_price_in_riel.toFixed(2)} ៛</td>
            <td>${item.raw_material.unit_price_in_usd.toFixed(2)}</td>
            <td>${item.total_price_in_usd.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Display Subtotal and Grand Total Below the Table */}
    <div className="invoice-totals">
      <h2 className="section-title">Totals</h2>
      <p><strong>Subtotal :</strong> {invoice.sub_total_in_riel.toFixed(2)} ៛ / $ {invoice.sub_total_in_usd.toFixed(2)}</p>
      {/* <p><strong>Subtotal (USD):</strong> ${invoice.sub_total_in_usd.toFixed(2)}</p> */}
      <p><strong>Grand Total Without Tax (Riel):</strong> {invoice.grand_total_without_tax_in_riel.toFixed(2)} ៛ / $ {invoice.grand_total_without_tax_in_usd.toFixed(2)}</p>
      {/* <p><strong>Grand Total Without Tax (USD):</strong> ${invoice.grand_total_without_tax_in_usd.toFixed(2)}</p> */}
      <p><strong>Grand Total With Tax (Riel):</strong> {invoice.grand_total_with_tax_in_riel.toFixed(2)} ៛ / $ {invoice.grand_total_with_tax_in_usd.toFixed(2)}</p>
      {/* <p><strong>Grand Total With Tax (USD):</strong> ${invoice.grand_total_with_tax_in_usd.toFixed(2)}</p> */}
    </div>

    <p className="thank-you">Thank you for your business!</p>
  </div>
);

export default GenerateInvoice;
