"use client";

import { Globe, UserCircle, Link2 } from "lucide-react";
import {
  Card,
  Text,
  Button,
  Stack,
  Divider,
  Avatar,
  Input,
} from "@/design-system";

interface AccountSectionProps {
  user: {
    name: string;
    initials: string;
    email: string;
    memberSince: string;
    displayName: string;
  };
  connectedAccounts: {
    provider: string;
    email: string;
    connected: boolean;
  }[];
  onSaveChanges?: () => void;
  onChangeAvatar?: () => void;
  onDeleteAccount?: () => void;
}

export function AccountSection({
  user,
  connectedAccounts,
  onSaveChanges,
  onChangeAvatar,
  onDeleteAccount,
}: AccountSectionProps) {
  return (
    <Stack gap="lg">
      {/* Profile Section */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <UserCircle size={20} className="text-blue-600" />
          </div>
          <Text variant="h3">Profile Information</Text>
        </div>
        <div className="flex items-start gap-6 mb-6">
          <Avatar fallback={user.initials} size="xl" />
          <div className="flex-1">
            <Text variant="body" className="font-medium mb-1">
              {user.name}
            </Text>
            <Text variant="body-sm" color="muted" className="mb-3">
              Member since {user.memberSince}
            </Text>
            <Button variant="secondary" size="sm" onClick={onChangeAvatar}>
              Change Avatar
            </Button>
          </div>
        </div>

        <Divider className="my-6" />

        <Stack gap="md">
          <div>
            <Text variant="body-sm" color="muted" className="mb-2">
              Display Name
            </Text>
            <Input defaultValue={user.displayName} className="max-w-md" />
          </div>
          <div>
            <Text variant="body-sm" color="muted" className="mb-2">
              Email
            </Text>
            <Input defaultValue={user.email} disabled className="max-w-md" />
            <Text variant="caption" color="muted" className="mt-1">
              Managed by your OAuth provider
            </Text>
          </div>
        </Stack>

        <div className="mt-6">
          <Button onClick={onSaveChanges}>Save Changes</Button>
        </div>
      </Card>

      {/* Connected Accounts */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Link2 size={20} className="text-blue-600" />
          </div>
          <Text variant="h3">Connected Accounts</Text>
        </div>
        <Stack gap="md">
          {connectedAccounts.map((account) => (
            <div
              key={account.provider}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-white border border-border flex items-center justify-center">
                  <Globe size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <Text variant="body" className="font-medium">
                    {account.provider}
                  </Text>
                  <Text variant="caption" color="muted">
                    {account.email}
                  </Text>
                </div>
              </div>
              <Text variant="body-sm" className="text-success">
                {account.connected ? "Connected" : "Not Connected"}
              </Text>
            </div>
          ))}
        </Stack>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/30">
        <Text variant="h3" className="mb-2 text-destructive">
          Danger Zone
        </Text>
        <Text variant="body-sm" color="muted" className="mb-6">
          Irreversible and destructive actions
        </Text>
        <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/5 border border-destructive/20">
          <div>
            <Text variant="body" className="font-medium">
              Delete Account
            </Text>
            <Text variant="body-sm" color="muted">
              Permanently delete your account and all data
            </Text>
          </div>
          <Button variant="destructive" size="sm" onClick={onDeleteAccount}>
            Delete
          </Button>
        </div>
      </Card>
    </Stack>
  );
}
