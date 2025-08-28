// /utils/apiHelpers.js
// Lightweight helpers you can reuse across routes

export function httpError(status, message, extra = {}) {
   const err = new Error(message);
   err.status = status;
   Object.assign(err, extra);
   return err;
}

export async function requireRole(req, roles, getRequester) {
   const requester = await getRequester(req);
   if (!requester) throw httpError(401, 'Authentication required');
   const role = (requester.role || requester.user_role || '').toString();
   if (!roles.includes(role)) throw httpError(403, 'Forbidden');
   return requester;
}

export function pick(obj = {}, allowed = []) {
   const out = {};
   for (const k of allowed) if (obj[k] !== undefined) out[k] = obj[k];
   return out;
}

export function parsePagination(url, { defaultLimit = 20, maxLimit = 100 } = {}) {
   const { searchParams } = new URL(url);
   const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
   const limit = Math.min(maxLimit, Math.max(1, parseInt(searchParams.get('limit') || String(defaultLimit), 10)));
   const q = (searchParams.get('q') || '').trim();
   const status = (searchParams.get('status') || '').trim();
   return { page, limit, q, status, searchParams };
}

export function canManageGym(requester, gym) {
   const role = String(requester.role || requester.user_role || '');
   if (role === 'SuperAdmin') return true;
   const requesterId = String(requester.id || '');
   const requesterGym = requester.gym_id ? String(requester.gym_id) : null;
   const owner = gym?.ownerUserId ? String(gym.ownerUserId) : null;
   const gymId = gym?._id ? String(gym._id) : null;
   return (requesterId && owner && requesterId === owner) || (requesterGym && gymId && requesterGym === gymId);
}

