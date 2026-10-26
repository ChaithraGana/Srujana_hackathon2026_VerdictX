import React, { useState, useEffect } from 'react';
import {
  fetchComplianceActions,
  updateComplianceAction,
  type ComplianceActionItemData
} from './api';

export function ComplianceActionsDashboardPage({ navigate }: { navigate: (path: string) => void }) {
  const [actions, setActions] = useState<ComplianceActionItemData[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAction, setSelectedAction] = useState<ComplianceActionItemData | null>(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [editingAssignee, setEditingAssignee] = useState('');
  const [successToast, setSuccessToast] = useState('');

  const loadActions = async () => {
    setIsLoading(true);
    try {
      const data = await fetchComplianceActions(statusFilter, priorityFilter);
      setActions(data);
    } catch (err) {
      console.error('Failed to load actions', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadActions();
  }, [statusFilter, priorityFilter]);

  const handleUpdateStatus = async (
    item: ComplianceActionItemData,
    newStatus: 'Not Started' | 'In Progress' | 'Blocked' | 'Completed'
  ) => {
    try {
      await updateComplianceAction({
        action_id: item.id,
        completion_status: newStatus
      });
      setActions((prev) =>
        prev.map((a) => (a.id === item.id ? { ...a, completion_status: newStatus } : a))
      );
      setSuccessToast(`Action status updated to ${newStatus}. Recorded as user-reported completion.`);
      setTimeout(() => setSuccessToast(''), 3000);
    } catch (err) {
      console.error('Update status error', err);
    }
  };

  const handleSaveModalDetails = async () => {
    if (!selectedAction) return;
    try {
      await updateComplianceAction({
        action_id: selectedAction.id,
        completion_status: selectedAction.completion_status,
        notes: editingNotes,
        assigned_to: editingAssignee
      });
      setActions((prev) =>
        prev.map((a) =>
          a.id === selectedAction.id
            ? { ...a, notes: editingNotes, assigned_to: editingAssignee }
            : a
        )
      );
      setSelectedAction(null);
      setSuccessToast('Compliance notes and assignee saved.');
      setTimeout(() => setSuccessToast(''), 3000);
    } catch (err) {
      console.error('Save details error', err);
    }
  };

  const filteredActions = actions.filter((a) => {
    const q = searchQuery.toLowerCase();
    return (
      a.action_title.toLowerCase().includes(q) ||
      a.who_should_perform.toLowerCase().includes(q) ||
      a.applicable_provision.toLowerCase().includes(q)
    );
  });

  const counts = {
    total: actions.length,
    pending: actions.filter((a) => a.completion_status === 'Not Started').length,
    inProgress: actions.filter((a) => a.completion_status === 'In Progress').length,
    completed: actions.filter((a) => a.completion_status === 'Completed').length,
    blocked: actions.filter((a) => a.completion_status === 'Blocked').length
  };

  return (
    <div className="proof-page" style={{ paddingBottom: '80px' }}>
      {/* Header Banner */}
      <div className="page-header page-header-dark" style={{ marginBottom: '24px' }}>
        <div>
          <div className="eyebrow eyebrow-light"><span className="eyebrow-line" />OPERATIONAL COMPLIANCE VAULT</div>
          <h1 style={{ color: 'var(--ivory)', fontSize: '28px', margin: '6px 0 8px' }}>
            My Compliance <em>Actions</em>
          </h1>
          <p style={{ color: 'rgba(243,239,230,0.85)', fontSize: '14px', maxWidth: '800px', margin: 0, lineHeight: 1.6 }}>
            Track, assign, and document every statutory compliance action generated from gazette amendments.
            All statuses are stored as user-reported records with tamper-evident Section 65B hash chains.
          </p>
        </div>
        <div className="page-header-action" style={{ display: 'flex', gap: '8px' }}>
          <button className="button button-gold" onClick={() => navigate('/analyze-amendment')}>
            + Analyze New Amendment
          </button>
        </div>
      </div>

      {successToast && (
        <div style={{ padding: '12px 16px', background: 'rgba(66,185,166,0.18)', border: '1px solid #42b9a6', borderRadius: '6px', color: '#a0eedf', marginBottom: '18px', fontSize: '13px' }}>
          ✓ {successToast}
        </div>
      )}

      {/* Metric Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ padding: '14px 18px', background: '#ffffff', borderRadius: '8px', border: '1px solid rgba(16,24,34,0.12)', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Total Actions</span>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#07111f', marginTop: '4px' }}>{counts.total}</div>
          <small style={{ color: '#64748b', fontSize: '11px' }}>Active statutory cards</small>
        </div>

        <div style={{ padding: '14px 18px', background: '#ffffff', borderRadius: '8px', border: '1px solid rgba(16,24,34,0.12)', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Not Started</span>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#c54040', marginTop: '4px' }}>{counts.pending}</div>
          <small style={{ color: '#64748b', fontSize: '11px' }}>Pending execution</small>
        </div>

        <div style={{ padding: '14px 18px', background: '#ffffff', borderRadius: '8px', border: '1px solid rgba(16,24,34,0.12)', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>In Progress</span>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#855d14', marginTop: '4px' }}>{counts.inProgress}</div>
          <small style={{ color: '#64748b', fontSize: '11px' }}>Under review / testing</small>
        </div>

        <div style={{ padding: '14px 18px', background: '#ffffff', borderRadius: '8px', border: '1px solid rgba(16,24,34,0.12)', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Completed</span>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#2e7d32', marginTop: '4px' }}>{counts.completed}</div>
          <small style={{ color: '#64748b', fontSize: '11px' }}>User-reported completion</small>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="table-card" style={{ marginBottom: '20px', padding: '14px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '240px' }}>
            <input
              type="text"
              placeholder="Search actions by task title, provision, or responsible person..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid rgba(16,24,34,0.2)', fontSize: '13px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#07111f' }}>Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid rgba(16,24,34,0.2)', fontSize: '12.5px' }}
              >
                <option value="All">All Statuses</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Blocked">Blocked</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#07111f' }}>Priority:</label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid rgba(16,24,34,0.2)', fontSize: '12.5px' }}
              >
                <option value="All">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredActions.length === 0 ? (
          <div className="table-card" style={{ padding: '36px', textAlign: 'center' }}>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
              No compliance actions match the selected filter criteria.
            </p>
          </div>
        ) : (
          filteredActions.map((act) => (
            <div
              key={act.id}
              className="table-card"
              style={{
                padding: '18px 22px',
                borderLeft: `4px solid ${
                  act.priority === 'Critical' ? '#c54040' : act.priority === 'High' ? '#855d14' : '#42b9a6'
                }`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="mono" style={{ fontSize: '11px', color: '#855d14', fontWeight: 700 }}>{act.id}</span>
                    <span
                      className={`status-pill ${
                        act.priority === 'Critical' ? 'pill-bad' : act.priority === 'High' ? 'pill-warn' : 'pill-neutral'
                      }`}
                      style={{ fontSize: '10.5px' }}
                    >
                      {act.priority}
                    </span>
                    <span className="status-pill pill-neutral" style={{ fontSize: '10.5px' }}>
                      Assignee: {act.assigned_to || act.who_should_perform}
                    </span>
                  </div>
                  <h3 style={{ margin: 0, fontSize: '17px', color: '#07111f', fontWeight: 700 }}>
                    {act.action_title}
                  </h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* Select status dropdown */}
                  <select
                    value={act.completion_status}
                    onChange={(e) => handleUpdateStatus(act, e.target.value as any)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '4px',
                      fontWeight: 700,
                      fontSize: '12px',
                      background:
                        act.completion_status === 'Completed'
                          ? 'rgba(46,125,50,0.15)'
                          : act.completion_status === 'In Progress'
                          ? 'rgba(200,169,110,0.18)'
                          : '#f1f5f9',
                      color:
                        act.completion_status === 'Completed'
                          ? '#2e7d32'
                          : act.completion_status === 'In Progress'
                          ? '#855d14'
                          : '#07111f',
                      border: '1px solid rgba(16,24,34,0.18)'
                    }}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Blocked">Blocked</option>
                    <option value="Completed">Completed</option>
                  </select>

                  <button
                    type="button"
                    className="button button-outline button-small"
                    onClick={() => {
                      setSelectedAction(act);
                      setEditingNotes(act.notes || '');
                      setEditingAssignee(act.assigned_to || act.who_should_perform);
                    }}
                    style={{ fontSize: '12px' }}
                  >
                    Details & Notes
                  </button>
                </div>
              </div>

              {/* Specific Task */}
              <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#334155', lineHeight: 1.55 }}>
                {act.specific_task}
              </p>

              {/* 15 Fields Details Summary */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '11.5px', background: '#fdfbf7', padding: '10px 14px', borderRadius: '4px', border: '1px solid rgba(16,24,34,0.08)' }}>
                <div>
                  <strong style={{ color: '#785116' }}>Due Date:</strong> {act.deadline}
                  <br />
                  <small style={{ color: '#64748b' }}>{act.deadline_calculation}</small>
                </div>
                <div>
                  <strong style={{ color: '#785116' }}>Where to Complete:</strong> {act.where_to_complete}
                  <br />
                  <small style={{ color: '#64748b' }}>Provision: {act.applicable_provision}</small>
                </div>
                <div>
                  <strong style={{ color: '#785116' }}>Proof of Completion:</strong> {act.expected_output}
                  <br />
                  <small style={{ color: '#64748b' }}>Evidence required for auditor</small>
                </div>
                <div>
                  <strong style={{ color: '#c54040' }}>Statutory Risk:</strong> {act.risk_of_missing}
                </div>
              </div>

              {act.notes && (
                <div style={{ marginTop: '8px', padding: '6px 10px', background: '#f1f5f9', borderRadius: '4px', fontSize: '11.5px', color: '#475569' }}>
                  <strong>Compliance Notes:</strong> {act.notes}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Detail / Notes Modal */}
      {selectedAction && (
        <div className="settings-modal-overlay" onClick={() => setSelectedAction(null)}>
          <div className="settings-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div className="settings-modal-header">
              <div>
                <span className="small-label" style={{ color: 'var(--gold)' }}>ACTION DETAILS & EVIDENCE ASSIGNMENT</span>
                <h3 style={{ margin: '4px 0 0', color: 'var(--ivory)', fontSize: '20px' }}>
                  {selectedAction.action_title}
                </h3>
              </div>
              <button className="button button-outline button-small" onClick={() => setSelectedAction(null)}>
                Close
              </button>
            </div>

            <div className="settings-modal-body" style={{ color: 'var(--ivory)' }}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                  Assigned Team Member / Role
                </label>
                <input
                  type="text"
                  value={editingAssignee}
                  onChange={(e) => setEditingAssignee(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'var(--ivory)', fontSize: '13px' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                  Internal Compliance Audit Notes & Evidence Links
                </label>
                <textarea
                  rows={4}
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Record file locations, ticket IDs, or ERP patch notes for statutory auditor..."
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'var(--ivory)', fontSize: '12.5px' }}
                />
              </div>

              <div style={{ padding: '12px', background: 'rgba(200,169,110,0.1)', borderRadius: '4px', border: '1px solid rgba(200,169,110,0.25)', fontSize: '11.5px', color: 'rgba(243,239,230,0.85)' }}>
                <strong>Statutory Notice:</strong> Status updates are recorded as user-reported compliance actions.
                A SHA-256 cryptographic digest protects record integrity under Section 65B of the Indian Evidence Act.
              </div>
            </div>

            <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="button button-outline button-small" onClick={() => setSelectedAction(null)}>
                Cancel
              </button>
              <button className="button button-gold button-small" onClick={handleSaveModalDetails}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
