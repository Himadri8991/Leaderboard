import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { FileUploadProps } from '../types';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      console.log('File dropped:', file.name, file.type);
      if (file.type === 'text/csv') {
        setFileName(file.name);
        onFileUpload(file);
      } else {
        alert('Please upload a CSV file only');
      }
    }
  }, [onFileUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name, file.type);
      if (file.type === 'text/csv') {
        setFileName(file.name);
        onFileUpload(file);
      } else {
        alert('Please upload a CSV file only');
      }
    }
  }, [onFileUpload]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`card border-2 border-dashed ${
        isDragging ? 'border-primary bg-primary/10' : 'border-gray-600'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <ArrowUpTrayIcon className="h-12 w-12 text-gray-400" />
        <p className="text-center text-gray-300">
          {fileName ? `Selected file: ${fileName}` : 'Drag and drop your CSV file here, or'}
        </p>
        <label className="btn btn-primary cursor-pointer">
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileInput}
          />
          Browse Files
        </label>
        <p className="text-sm text-gray-400">Only CSV files are supported</p>
      </div>
    </motion.div>
  );
}; 