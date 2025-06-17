// src/App.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';   // ← import print rules here

function App() {
  const [invoice, setInvoice] = useState({
    customerName: "",
    customerPhone: "",
    invoiceNumber: generateInvoiceNumber(),
    date: getCurrentDate(),
    items: [],
    notes: "Thank you for your business! ",
    copyright: " © Created by Codivora Solutions 2025",
    companyName: "BANGA'S NATION",
    companyAddress: "DEALERS IN ALL KIND OF GREASE AND LUBRICANT",
    officeAddress: "God's Own Plaza, Shop 4, Aspmda Int'l Trade Fair Complex, Badagry Expressway, Ojo, Lagos.",
    companyPhone: "Tel: 07062669725, 09127208080",
    companyEmail: "eobumkaneme@gmail.com"
  });

  function generateInvoiceNumber() {
    return String(Math.floor(100000 + Math.random() * 900000));
  }

  function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
  }

  useEffect(() => {
    setInvoice(prev => ({
      ...prev,
      invoiceNumber: generateInvoiceNumber(),
      date: getCurrentDate()
    }));
  }, []);

  const subtotal = invoice.items.reduce(
    (sum, item) => sum + ((+item.quantity || 0) * (+item.price || 0)),
    0
  );
  const total = subtotal;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (id, field, value) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { id: Date.now(), description: "", quantity: "", price: "" }
      ]
    }));
  };

  const removeItem = (id) => {
    if (invoice.items.length <= 1) return;
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const shareViaWhatsApp = () => {
    const message = encodeURIComponent(
      `*${invoice.companyName}*\n` +
      `${invoice.companyAddress}\n\n` +
      `Invoice: ${invoice.invoiceNumber}\n` +
      `Date: ${invoice.date}\n\n` +
      `Office: ${invoice.officeAddress}\n` +
      `${invoice.companyPhone}\n` +
      `Email: ${invoice.companyEmail}\n\n` +
      `Customer: ${invoice.customerName}\n` +
      `Phone: ${invoice.customerPhone}\n\n` +
      invoice.items.map(item =>
        `${item.description} - ${item.quantity || 0} x ₦${(+item.price || 0).toFixed(2)} = ₦${((+item.quantity || 0) * (+item.price || 0)).toFixed(2)}`
      ).join('\n') +
      `\n\nSubtotal: ₦${subtotal.toFixed(2)}` +
      `\n*Total: ₦${total.toFixed(2)}*\n\n` +
      `${invoice.notes}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const sectionVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  const itemVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
  };
  const buttonTap = { scale: 0.95 };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 p-4 md:p-6"
      initial="hidden"
      animate="visible"
      variants={sectionVariant}
      transition={{ staggerChildren: 0.1 }}
    >
      <div className="max-w-4xl mx-auto space-y-6 invoice-container">
        <motion.div variants={sectionVariant} className="text-center">
          <motion.h1 className="text-2xl md:text-3xl font-bold" variants={sectionVariant}>
            {invoice.companyName}
          </motion.h1>
          <motion.p className="text-lg md:text-xl text-gray-700" variants={sectionVariant}>
            {invoice.companyAddress}
          </motion.p>
          <motion.div className="mt-4 bg-white p-4 rounded-lg shadow inline-block" variants={sectionVariant}>
            <h2 className="text-xl font-bold">INVOICE</h2>
            <p className="text-lg font-mono">{invoice.invoiceNumber}</p>
          </motion.div>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={sectionVariant}>
          <motion.div className="bg-white p-4 rounded-lg shadow" variants={sectionVariant}>
            <h2 className="text-lg font-semibold mb-4 text-green-700">Office Information</h2>
            <p className="font-medium">OFFICE</p>
            <p className="text-sm">{invoice.officeAddress}</p>
            <p className="text-sm">{invoice.companyPhone}</p>
            <p className="text-sm">Email: {invoice.companyEmail}</p>
          </motion.div>
          <motion.div className="bg-white p-4 rounded-lg shadow" variants={sectionVariant}>
            <h2 className="text-lg font-semibold mb-4 text-green-700">Customer's Name & Address</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={invoice.customerName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="Customer Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={invoice.customerPhone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="Customer Phone"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="text"
                    value={invoice.date}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Invoice No</label>
                  <input
                    type="text"
                    value={invoice.invoiceNumber}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 font-mono"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="bg-white p-4 rounded-lg shadow" variants={sectionVariant}>
          <div className="flex justify-between items-center mb-4">
            <motion.h2 className="text-lg font-semibold text-green-700" variants={sectionVariant}>
              Invoice Items
            </motion.h2>
            <motion.button
              onClick={addItem}
              whileTap={buttonTap}
              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
            >
              Add Item
            </motion.button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Qty</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Price (₦)</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Total (₦)</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {invoice.items.map(item => (
                    <motion.tr
                      key={item.id}
                      variants={itemVariant}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={item.description}
                          onChange={e => handleItemChange(item.id, 'description', e.target.value)}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          placeholder="Product description"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={e => handleItemChange(item.id, 'quantity', e.target.value)}
                          className="w-20 ml-auto rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-right"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          step="0.01"
                          value={item.price}
                          onChange={e => handleItemChange(item.id, 'price', e.target.value)}
                          className="w-24 ml-auto rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-right"
                        />
                      </td>
                      <td className="px-4 py-2 text-right font-medium">
                        ₦{((+item.quantity || 0) * (+item.price || 0)).toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <motion.button
                          onClick={() => removeItem(item.id)}
                          whileTap={buttonTap}
                          className="text-red-500 hover:text-red-700"
                          disabled={invoice.items.length <= 1}
                        >
                          ✕
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div className="bg-white p-4 rounded-lg shadow" variants={sectionVariant}>
          <div className="flex justify-end">
            <div className="w-full md:w-1/3">
              <div className="flex justify-between py-2">
                <span>Subtotal:</span>
                <span>₦{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-lg border-t border-gray-200 mt-2">
                <span>Total:</span>
                <span>₦{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="no-print">
          <motion.div className="bg-white p-4 rounded-lg shadow" variants={sectionVariant}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                name="notes"
                value={invoice.notes}
                onChange={handleChange}
                disabled
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
               <textarea
                name="copyright"
                value={invoice.copyright}
                onChange={handleChange}
                rows="3"
                disabled
                className="mt-1 flex justify-center items-center w-full  border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <motion.button
                onClick={() => window.print()}
                whileTap={buttonTap}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Print Preview
              </motion.button>
              <motion.button
                onClick={shareViaWhatsApp}
                whileTap={buttonTap}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Share via WhatsApp
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default App;
