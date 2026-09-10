import React from 'react'
import { AnimatePresence, motion } from "motion/react"
import { GiArtificialHive, GiTwoCoins } from 'react-icons/gi'
import { FiFileText, FiLogOut, FiMap, FiPlus, FiSidebar, FiStar } from 'react-icons/fi'
import { useNavigate, useLocation } from "react-router-dom"
import { FaCirclePlus } from "react-icons/fa6";

const NAV_ITEMS = [
    {
        icon: <FiFileText size={15} />,
        label: "Resume Builder",
        path: "/resume",
    },
    {
        icon: <FiStar size={15} />,
        label: "Resume Scorer",
        path: "/scorer",
    },
    {
        icon: <FiMap size={15} />,
        label: "Roadmap Builder",
        path: "/roadmap",
    },


];

function Sidebar({
    user,
    onNewInterview,
    onLogout,
    sidebarOpen,
    setSidebarOpen,
    moblieOpen,
    setMoblieOpen
}) {
    const navigate = useNavigate()
    const location = useLocation()
    const avatar = user?.name ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "U"


    const inner = (
        <div className='flex flex-col h-full'>
            <div className={`px-3 h-[52px] border-b border-black/8 shrink-0 flex items-center ${sidebarOpen ? "justify-between" : "justify-center"
                }`}>
                {sidebarOpen && (
                    <div className='flex items-center gap-2.5'>
                        <div className='w-7 h-7 rounded-lg bg-ink flex items-center justify-center shrink-0'><GiArtificialHive size={19} className='text-amber' /></div>
                        <motion.span
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.15 }}
                            className='font-display font-semibold text-sm tracking-tight text-[#0A0A0A] whitespace-nowrap'>FresherAI</motion.span>

                    </div>
                )}
                <div className='flex items-center '>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className='cursor-pointer hidden md:flex text-black/30 hover:text-[#0A0A0A] transition-colors shrink-0'>
                        <FiSidebar size={15} />

                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMoblieOpen(!moblieOpen)}
                        className='cursor-pointer md:hidden  text-black/30 hover:text-[#0A0A0A] transition-colors shrink-0'>
                        <FiSidebar size={15} />

                    </motion.button>
                </div>

            </div>


            <div className='px-2.5 pt-3 pb-1.5 shrink-0'>
                <motion.button
                    onClick={onNewInterview}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full flex items-center gap-2 bg-amber text-ink font-semibold rounded-lg py-2 transition-all cursor-pointer hover:bg-amber-soft ${sidebarOpen ? "px-2.5 " : "justify-center px-0"
                        }`}>
                    <FiPlus size={14} className='shrink-0' />
                    <AnimatePresence>
                        {sidebarOpen &&
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.13 }}
                                className='text-xs whitespace-nowrap'>
                                Create Interview
                            </motion.span>}
                    </AnimatePresence>
                </motion.button>
            </div>
            <AnimatePresence>
                {sidebarOpen &&
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.13 }}
                        className='px-3 pt-2.5 pb-1 text-[10px] font-semibold uppercase tracking-widest text-black/30'>
                        Agents

                    </motion.p>}
            </AnimatePresence>

            <nav className='flex flex-col gap-0.5 px-2.5 flex-1'>
                {NAV_ITEMS.map((nav, i) => {
                    const isActive = location.pathname === nav.path
                    return (
                    <motion.button key={i}
                        onClick={() => {
                            navigate(nav.path);
                            setMoblieOpen(false)
                        }}
                        whileHover={{ x: sidebarOpen ? 3 : 0 }}
                        transition={{ duration: 0.13 }}
                        className={`relative flex items-center gap-2.5 rounded-lg py-2 transition-colors text-xs font-medium cursor-pointer ${
                            isActive ? "text-[#0A0A0A] bg-amber/10" : "text-black/45 hover:text-[#0A0A0A] hover:bg-black/5"
                        } ${sidebarOpen ? "px-2.5 " : "justify-center px-0"
                            }`}>
                        {isActive && <span className='absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-full bg-amber' />}
                        <span className='shrink-0'>{nav.icon}</span>

                        {sidebarOpen &&
                            <span className='whitespace-nowrap'>{nav.label}
                            </span>}



                    </motion.button>
                )})}

            </nav>

            {/* coins */}

            <div className='border-t border-black/8 p-2.5 shrink-0'>
                <AnimatePresence>
                    {sidebarOpen &&
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.13 }}
                            onClick={() => navigate("/billing")}
                            className='group flex cursor-pointer items-center justify-between gap-2.5 rounded-lg border border-white/8 bg-ink px-2.5 py-1.5 mb-2.5 transition-colors hover:border-amber/25'>
                            <div className='flex items-center gap-1.5'>
                                <GiTwoCoins size={15} className='text-amber shrink-0' />

                                <div className='flex flex-col'>
                                    <span className='text-[9px] text-white/40 font-medium'>Interview coins</span>
                                    <span className='font-display text-xs font-semibold text-white'>{user?.interviewCoin}</span>
                                </div>
                            </div>

                            <div className='flex items-center justify-center'>
                                <FaCirclePlus size={16} className='text-amber/70 transition-transform duration-200 group-hover:scale-110' />
                            </div>


                        </motion.div>}
                </AnimatePresence>

                <div className={`flex items-center gap-2 ${sidebarOpen ? "" : "justify-center"}`}>
                    <div className='w-7 h-7 rounded-full bg-ink flex items-center justify-center shrink-0'>
                        <span className='font-display text-amber font-semibold text-[10px]'>
                            {avatar}

                        </span>
                    </div>

                    <AnimatePresence>
                        {sidebarOpen && (

                            <motion.div initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex-1 min-w-0">
                                <p className="text-[#0A0A0A] text-[11px] font-semibold truncate">
                                    {user?.name ?? "User"}
                                </p>
                                <p className="text-black/35 text-[9px] truncate">
                                    {user?.email ?? "user@email.com"}
                                </p>
                            </motion.div>




                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {sidebarOpen && (

                            <motion.button
                                onClick={onLogout}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                whileHover={{ scale: 1.15 }}
                                className='text-black/30 hover:text-[#0A0A0A] transition-colors ml-auto'>
                                <FiLogOut size={13} />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>



        </div>
    )
    return (
        <>
            <motion.aside
                animate={{ width: sidebarOpen ? 260 : 72 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}

                className='hidden md:flex fixed top-0 left-0 h-screen bg-white border-r border-black/8 flex-col z-40 overflow-hidden'>
                {inner}
            </motion.aside>

            <AnimatePresence>
                {moblieOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMoblieOpen(false)}
                        className='fixed inset-0 bg-black/30 z-40 md:hidden backdrop-blur-sm' />
                )}
            </AnimatePresence>


            <AnimatePresence>
                {moblieOpen && (
                    <motion.aside
                        initial={{ x: -280 }}
                        animate={{ x: 0 }}
                        exit={{ x: -280 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className='fixed top-0 left-0 h-screen w-[280px] max-w-[85vw] bg-white border-r border-black/8 flex flex-col z-50 md:hidden overflow-hidden'>
                        {inner}
                    </motion.aside>
                )}
            </AnimatePresence>


        </>
    )
}

export default Sidebar