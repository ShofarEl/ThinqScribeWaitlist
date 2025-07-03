import React, { useState, useEffect } from 'react';
import { waitlistAPI } from '../services/api';

const WaitlistTable = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: 'all',
    search: '',
    sortBy: 'createdAt',
    order: 'desc'
  });
  const [pagination, setPagination] = useState({});
  const [statusCounts, setStatusCounts] = useState({});

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'student', label: 'Students' },
    { value: 'educator', label: 'Educators' },
    { value: 'professional', label: 'Professionals' },
    { value: 'researcher', label: 'Researchers' },
    { value: 'other', label: 'Other' }
  ];

  const fetchEntries = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await waitlistAPI.getEntries(filters);
      setEntries(response.data);
      setPagination(response.pagination);
      setStatusCounts(response.statusCounts || {});
    } catch (err) {
      console.error('Error fetching entries:', err);
      setError(err.message || 'Failed to load waitlist entries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key !== 'page' ? 1 : value // Reset to page 1 when changing filters
    }));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    // Debounce search
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      handleFilterChange('search', value);
    }, 500);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      student: 'bg-blue-100 text-blue-800',
      educator: 'bg-green-100 text-green-800',
      professional: 'bg-purple-100 text-purple-800',
      researcher: 'bg-orange-100 text-orange-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || colors.other;
  };

  const handleDelete = async (id, email) => {
    if (!window.confirm(`Are you sure you want to remove ${email} from the waitlist?`)) {
      return;
    }

    try {
      await waitlistAPI.deleteEntry(id);
      fetchEntries(); // Refresh the list
    } catch (err) {
      console.error('Error deleting entry:', err);
      alert('Failed to delete entry. Please try again.');
    }
  };

  const totalCount = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="card">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Waitlist Management
          </h2>
          <p className="text-gray-600">
            Total entries: <span className="font-semibold">{totalCount}</span>
          </p>
        </div>

        {/* Status counts */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {statusOptions.slice(1).map(option => (
            <div key={option.value} className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold text-gray-800">
                {statusCounts[option.value] || 0}
              </div>
              <div className="text-sm text-gray-600">{option.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="label">Search</label>
            <input
              type="text"
              placeholder="Search by name or email..."
              onChange={handleSearch}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="label">Filter by Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="input-field"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Sort by</label>
            <select
              value={`${filters.sortBy}-${filters.order}`}
              onChange={(e) => {
                const [sortBy, order] = e.target.value.split('-');
                setFilters(prev => ({ ...prev, sortBy, order, page: 1 }));
              }}
              className="input-field"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="firstName-asc">First Name A-Z</option>
              <option value="firstName-desc">First Name Z-A</option>
              <option value="lastName-asc">Last Name A-Z</option>
              <option value="lastName-desc">Last Name Z-A</option>
              <option value="email-asc">Email A-Z</option>
              <option value="email-desc">Email Z-A</option>
            </select>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-thinq-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading entries...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-700">{error}</p>
            <button 
              onClick={fetchEntries}
              className="mt-2 text-red-600 hover:text-red-800 underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Joined</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-8 text-gray-500">
                        No entries found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    entries.map((entry) => (
                      <tr key={entry._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-800">
                            {entry.firstName} {entry.lastName}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {entry.email}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(entry.status)}`}>
                            {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">
                          {formatDate(entry.createdAt)}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleDelete(entry._id, entry.email)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-600">
                  Showing {((pagination.currentPage - 1) * pagination.entriesPerPage) + 1} to{' '}
                  {Math.min(pagination.currentPage * pagination.entriesPerPage, pagination.totalEntries)} of{' '}
                  {pagination.totalEntries} entries
                </div>
                
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleFilterChange('page', pagination.currentPage - 1)}
                    disabled={pagination.currentPage <= 1}
                    className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  
                  {[...Array(pagination.totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handleFilterChange('page', page)}
                        className={`px-3 py-1 rounded border ${
                          page === pagination.currentPage
                            ? 'bg-thinq-blue-600 text-white'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => handleFilterChange('page', pagination.currentPage + 1)}
                    disabled={pagination.currentPage >= pagination.totalPages}
                    className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WaitlistTable; 