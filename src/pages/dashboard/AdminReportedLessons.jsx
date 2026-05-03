import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AdminReportedLessons = () => {
  const { userProfile } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedReport, setSelectedReport] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState("");

  useEffect(() => {
    // Check if user is admin
    if (userProfile?.role !== "admin") {
      toast.error("Access denied. Admin privileges required.");
      return;
    }

    const fetchReports = async () => {
      try {
        // Mock data - replace with actual API call
        const mockReports = [
          {
            id: 1,
            lessonId: 2,
            lesson: {
              id: 2,
              title: "Leading with Empathy",
              description:
                "How empathy became my greatest leadership tool in challenging times...",
              creatorName: "Bob Smith",
              creatorEmail: "bob@example.com",
              creatorUid: "user2",
              category: "Leadership",
              emotionalTone: "Professional",
              visibility: "Public",
              accessLevel: "premium",
              createdAt: "2024-01-12T14:30:00Z",
              likesCount: 156,
              favoritesCount: 67,
              viewsCount: 892,
            },
            reporterId: "user5",
            reporterName: "Emma Brown",
            reporterEmail: "emma@example.com",
            reason: "inappropriate",
            description:
              "This lesson contains inappropriate language and offensive content that violates community guidelines.",
            status: "pending",
            createdAt: "2024-01-20T10:30:00Z",
            reviewedAt: null,
            reviewedBy: null,
          },
          {
            id: 2,
            lessonId: 4,
            lesson: {
              id: 4,
              title: "The Art of Letting Go",
              description:
                "Finding freedom in release and embracing new beginnings...",
              creatorName: "David Wilson",
              creatorEmail: "david@example.com",
              creatorUid: "user4",
              category: "Personal Growth",
              emotionalTone: "Motivational",
              visibility: "Public",
              accessLevel: "premium",
              createdAt: "2024-01-08T11:20:00Z",
              likesCount: 445,
              favoritesCount: 178,
              viewsCount: 2341,
            },
            reporterId: "user6",
            reporterName: "Frank Miller",
            reporterEmail: "frank@example.com",
            reason: "misleading",
            description:
              "The claims made in this lesson are not backed by any evidence and could be misleading to readers.",
            status: "pending",
            createdAt: "2024-01-20T09:15:00Z",
            reviewedAt: null,
            reviewedBy: null,
          },
          {
            id: 3,
            lessonId: 5,
            lesson: {
              id: 5,
              title: "Building Resilience",
              description:
                "How to bounce back from setbacks and grow stronger through adversity...",
              creatorName: "Emma Brown",
              creatorEmail: "emma@example.com",
              creatorUid: "user5",
              category: "Career",
              emotionalTone: "Inspirational",
              visibility: "Public",
              accessLevel: "free",
              createdAt: "2024-01-05T09:30:00Z",
              likesCount: 289,
              favoritesCount: 134,
              viewsCount: 1876,
            },
            reporterId: "user7",
            reporterName: "Grace Lee",
            reporterEmail: "grace@example.com",
            reason: "spam",
            description:
              "This appears to be spam content with repetitive promotional material.",
            status: "approved",
            createdAt: "2024-01-19T16:45:00Z",
            reviewedAt: "2024-01-19T18:20:00Z",
            reviewedBy: "admin_user",
          },
          {
            id: 4,
            lessonId: 2,
            lesson: {
              id: 2,
              title: "Leading with Empathy",
              description:
                "How empathy became my greatest leadership tool in challenging times...",
              creatorName: "Bob Smith",
              creatorEmail: "bob@example.com",
              creatorUid: "user2",
              category: "Leadership",
              emotionalTone: "Professional",
              visibility: "Public",
              accessLevel: "premium",
              createdAt: "2024-01-12T14:30:00Z",
              likesCount: 156,
              favoritesCount: 67,
              viewsCount: 892,
            },
            reporterId: "user8",
            reporterName: "Henry Chen",
            reporterEmail: "henry@example.com",
            reason: "harassment",
            description:
              "This lesson contains harassing content targeting specific individuals.",
            status: "pending",
            createdAt: "2024-01-20T08:30:00Z",
            reviewedAt: null,
            reviewedBy: null,
          },
          {
            id: 5,
            lessonId: 5,
            lesson: {
              id: 5,
              title: "Building Resilience",
              description:
                "How to bounce back from setbacks and grow stronger through adversity...",
              creatorName: "Emma Brown",
              creatorEmail: "emma@example.com",
              creatorUid: "user5",
              category: "Career",
              emotionalTone: "Inspirational",
              visibility: "Public",
              accessLevel: "free",
              createdAt: "2024-01-05T09:30:00Z",
              likesCount: 289,
              favoritesCount: 134,
              viewsCount: 1876,
            },
            reporterId: "user9",
            reporterName: "Iris Johnson",
            reporterEmail: "iris@example.com",
            reason: "other",
            description:
              "This lesson violates copyright by using content from other sources without attribution.",
            status: "rejected",
            createdAt: "2024-01-18T14:20:00Z",
            reviewedAt: "2024-01-18T15:45:00Z",
            reviewedBy: "admin_user",
          },
        ];

        setTimeout(() => {
          setReports(mockReports);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching reports:", error);
        toast.error("Failed to load reports");
        setLoading(false);
      }
    };

    fetchReports();
  }, [userProfile]);

  const handleApproveReport = async (reportId) => {
    try {
      // API call would go here
      // await apiClient.patch(`/reports/${reportId}`, { status: "approved" });

      setReports((prev) =>
        prev.map((report) =>
          report.id === reportId
            ? {
                ...report,
                status: "approved",
                reviewedAt: new Date().toISOString(),
                reviewedBy: userProfile.uid,
              }
            : report,
        ),
      );

      toast.success("Report approved - lesson will be reviewed");
      setShowActionModal(false);
      setSelectedReport(null);
    } catch (error) {
      toast.error("Failed to approve report");
    }
  };

  const handleRejectReport = async (reportId) => {
    try {
      // API call would go here
      // await apiClient.patch(`/reports/${reportId}`, { status: "rejected" });

      setReports((prev) =>
        prev.map((report) =>
          report.id === reportId
            ? {
                ...report,
                status: "rejected",
                reviewedAt: new Date().toISOString(),
                reviewedBy: userProfile.uid,
              }
            : report,
        ),
      );

      toast.success("Report rejected - no action taken");
      setShowActionModal(false);
      setSelectedReport(null);
    } catch (error) {
      toast.error("Failed to reject report");
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    try {
      // API call would go here
      // await apiClient.delete(`/lessons/${lessonId}`);

      // Update all reports for this lesson to show lesson was deleted
      setReports((prev) =>
        prev.map((report) =>
          report.lessonId === lessonId
            ? {
                ...report,
                status: "lesson_deleted",
                reviewedAt: new Date().toISOString(),
                reviewedBy: userProfile.uid,
              }
            : report,
        ),
      );

      toast.success("Lesson deleted successfully");
      setShowActionModal(false);
      setSelectedReport(null);
    } catch (error) {
      toast.error("Failed to delete lesson");
    }
  };

  const openActionModal = (report, action) => {
    setSelectedReport(report);
    setActionType(action);
    setShowActionModal(true);
  };

  const getReasonLabel = (reason) => {
    const reasons = {
      inappropriate: "Inappropriate Content",
      harassment: "Hate Speech/Harassment",
      misleading: "Misleading Information",
      spam: "Spam/Promotional",
      disturbing: "Sensitive/Disturbing",
      other: "Other",
    };
    return reasons[reason] || reason;
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: {
        color: "bg-yellow-500/20 text-yellow-500",
        label: "⏳ Pending",
      },
      approved: {
        color: "bg-green-500/20 text-green-500",
        label: "✓ Approved",
      },
      rejected: { color: "bg-red-500/20 text-red-500", label: "✗ Rejected" },
      lesson_deleted: {
        color: "bg-gray-500/20 text-gray-400",
        label: "🗑️ Lesson Deleted",
      },
    };
    const badge = badges[status] || badges.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  // Filter and sort reports
  const filteredAndSortedReports = reports
    .filter((report) => {
      if (filter === "all") return true;
      if (filter === "pending") return report.status === "pending";
      if (filter === "approved") return report.status === "approved";
      if (filter === "rejected") return report.status === "rejected";
      if (filter === "inappropriate") return report.reason === "inappropriate";
      if (filter === "harassment") return report.reason === "harassment";
      if (filter === "misleading") return report.reason === "misleading";
      if (filter === "spam") return report.reason === "spam";
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "reason") return a.reason.localeCompare(b.reason);
      if (sortBy === "lesson")
        return a.lesson.title.localeCompare(b.lesson.title);
      return 0;
    });

  if (userProfile?.role !== "admin") {
    return (
      <div className="page-shell page-wrapper flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-3xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-gray-400 mb-6">
            You need admin privileges to access this page.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-shell page-wrapper flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page-shell page-wrapper px-3 md:px-6">
      <div className="site-range">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Reported Lessons
            </h1>
            <p className="text-gray-400">
              Review and manage user reports for inappropriate content
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span>Total: {reports.length}</span>
            <span>•</span>
            <span>
              Pending: {reports.filter((r) => r.status === "pending").length}
            </span>
            <span>•</span>
            <span>
              Reviewed: {reports.filter((r) => r.status !== "pending").length}
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="card section-block">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Filter */}
            <div className="flex-1">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 bg-navy-light border border-navy rounded-lg text-white focus:outline-none focus:border-gold"
              >
                <option value="all">All Reports</option>
                <option value="pending">Pending Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="inappropriate">Inappropriate Content</option>
                <option value="harassment">Hate Speech/Harassment</option>
                <option value="misleading">Misleading Information</option>
                <option value="spam">Spam/Promotional</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-navy-light border border-navy rounded-lg text-white focus:outline-none focus:border-gold"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="reason">Reason</option>
                <option value="lesson">Lesson Title</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredAndSortedReports.map((report) => (
            <div key={report.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">
                      {report.lesson.title}
                    </h3>
                    {getStatusBadge(report.status)}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span>by {report.lesson.creatorName}</span>
                    <span>•</span>
                    <span>{report.lesson.category}</span>
                    <span>•</span>
                    <span>
                      Reported {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-4">
                    {report.lesson.description}
                  </p>
                </div>
              </div>

              {/* Report Details */}
              <div className="bg-navy-light rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">Report Details</h4>
                  <span className="px-2 py-1 bg-red-500/20 text-red-500 rounded-full text-xs">
                    {getReasonLabel(report.reason)}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                  <span>Reported by: {report.reporterName}</span>
                  <span>({report.reporterEmail})</span>
                </div>

                <p className="text-gray-300">{report.description}</p>
              </div>

              {/* Lesson Stats */}
              <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                <span>❤️ {report.lesson.likesCount} likes</span>
                <span>🔖 {report.lesson.favoritesCount} favorites</span>
                <span>👀 {report.lesson.viewsCount} views</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    report.lesson.accessLevel === "premium"
                      ? "bg-gold/20 text-gold"
                      : "bg-blue-500/20 text-blue-500"
                  }`}
                >
                  {report.lesson.accessLevel === "premium"
                    ? "⭐ Premium"
                    : "🆓 Free"}
                </span>
              </div>

              {/* Actions */}
              {report.status === "pending" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => openActionModal(report, "approve")}
                    className="px-4 py-2 bg-green-500/20 text-green-500 rounded-lg font-medium hover:bg-green-500/30 transition-all"
                  >
                    Approve Report
                  </button>
                  <button
                    onClick={() => openActionModal(report, "reject")}
                    className="px-4 py-2 bg-red-500/20 text-red-500 rounded-lg font-medium hover:bg-red-500/30 transition-all"
                  >
                    Reject Report
                  </button>
                  <button
                    onClick={() => openActionModal(report, "delete")}
                    className="px-4 py-2 bg-red-600/20 text-red-600 rounded-lg font-medium hover:bg-red-600/30 transition-all"
                  >
                    Delete Lesson
                  </button>
                </div>
              )}

              {report.status !== "pending" && (
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>
                    Reviewed by {report.reviewedBy} on{" "}
                    {report.reviewedAt
                      ? new Date(report.reviewedAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredAndSortedReports.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🚩</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No reports found
            </h3>
            <p className="text-gray-400">
              {filter !== "all"
                ? "Try adjusting your filters"
                : "No lessons have been reported yet"}
            </p>
          </div>
        )}

        {/* Action Modal */}
        {showActionModal && selectedReport && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
            <div className="bg-navy-dark rounded-2xl p-6 max-w-md w-full border border-navy-light">
              <h3 className="text-xl font-semibold text-white mb-4">
                {actionType === "approve" && "Approve Report"}
                {actionType === "reject" && "Reject Report"}
                {actionType === "delete" && "Delete Lesson"}
              </h3>

              <div className="mb-4">
                <p className="text-gray-300 mb-2">
                  {actionType === "approve" &&
                    "Are you sure you want to approve this report? The lesson will be flagged for review."}
                  {actionType === "reject" &&
                    "Are you sure you want to reject this report? No action will be taken on the lesson."}
                  {actionType === "delete" &&
                    "Are you sure you want to delete this lesson? This action cannot be undone."}
                </p>
                <div className="bg-navy-light rounded-lg p-3 mt-2">
                  <h4 className="text-white font-medium">
                    {selectedReport.lesson.title}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    by {selectedReport.lesson.creatorName}
                  </p>
                  <p className="text-gray-300 text-sm mt-1">
                    {getReasonLabel(selectedReport.reason)}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    if (actionType === "approve")
                      handleApproveReport(selectedReport.id);
                    if (actionType === "reject")
                      handleRejectReport(selectedReport.id);
                    if (actionType === "delete")
                      handleDeleteLesson(selectedReport.lessonId);
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    actionType === "delete"
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : actionType === "approve"
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  {actionType === "approve" && "Approve"}
                  {actionType === "reject" && "Reject"}
                  {actionType === "delete" && "Delete"}
                </button>
                <button
                  onClick={() => {
                    setShowActionModal(false);
                    setSelectedReport(null);
                    setActionType("");
                  }}
                  className="flex-1 px-4 py-2 bg-navy-light text-gray-300 rounded-lg font-medium hover:text-white transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReportedLessons;
