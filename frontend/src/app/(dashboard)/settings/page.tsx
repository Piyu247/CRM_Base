"use client";

import { useState } from "react";
import { User, Bell, Palette, Shield, Save } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your account and preferences.</p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar Tabs */}
        <nav className="flex lg:flex-col gap-1 lg:w-56 overflow-x-auto lg:overflow-visible">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950"
        >
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Update your personal details and avatar.</p>
              </div>

              <div className="flex items-center gap-6">
                <img src="https://avatar.vercel.sh/user" alt="Avatar" className="h-20 w-20 rounded-full border-2 border-gray-200 dark:border-gray-700" />
                <div>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                  <p className="mt-1 text-xs text-gray-500">JPG, PNG, max 2MB</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                  <Input defaultValue="John" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                  <Input defaultValue="Doe" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <Input type="email" defaultValue="john@nexuscrm.com" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                  <Input defaultValue="Admin" disabled />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="gap-2"><Save className="h-4 w-4" /> Save Changes</Button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Preferences</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Choose what notifications you receive.</p>
              </div>
              {[
                { title: "Email Notifications", desc: "Receive email updates for new leads and deals" },
                { title: "Push Notifications", desc: "Get browser push notifications for urgent tasks" },
                { title: "Weekly Digest", desc: "Receive a weekly summary of your activity" },
                { title: "Mention Alerts", desc: "Get notified when someone mentions you" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-gray-100 p-4 dark:border-gray-800">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" defaultChecked={i < 2} className="peer sr-only" />
                    <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-indigo-600 peer-checked:after:translate-x-full dark:bg-gray-700 dark:after:bg-gray-300 dark:peer-checked:bg-indigo-500"></div>
                  </label>
                </div>
              ))}
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Customize the look and feel of the app.</p>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {(["light", "dark", "system"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`rounded-xl border-2 p-4 text-center text-sm font-medium capitalize transition-all ${
                        theme === t
                          ? "border-indigo-600 bg-indigo-50 text-indigo-600 dark:border-indigo-500 dark:bg-indigo-900/30 dark:text-indigo-400"
                          : "border-gray-200 text-gray-600 hover:border-gray-300 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your password and security settings.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="gap-2"><Shield className="h-4 w-4" /> Update Password</Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
