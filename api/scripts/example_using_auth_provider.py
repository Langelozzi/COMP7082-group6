"""
Example: Using the AuthProvider model for data seeding.

This shows how to use the AuthProvider model for cleaner, type-safe data seeding.
"""
import asyncio
from app.shared.db.session import async_session_factory
from app.shared.db.models.auth_provider import AuthProvider
from sqlalchemy import select


async def seed_auth_providers_with_model():
    """Seed auth providers using the AuthProvider model."""
    async with async_session_factory() as session:
        # Check if providers already exist
        result = await session.execute(select(AuthProvider))
        existing_providers = result.scalars().all()
        
        if existing_providers:
            print(f"ℹ️  Auth providers already exist: {[p.name for p in existing_providers]}")
            return
        
        # Create providers using the model
        providers = [
            AuthProvider(name='email', display_name='Email', is_enabled=True),
            AuthProvider(name='google', display_name='Google', is_enabled=True),
            AuthProvider(name='github', display_name='GitHub', is_enabled=True),
            AuthProvider(name='microsoft', display_name='Microsoft', is_enabled=True),
        ]
        
        session.add_all(providers)
        await session.commit()
        
        print("✅ Auth providers seeded:")
        for provider in providers:
            print(f"   - {provider.display_name} ({provider.name})")


async def toggle_provider(name: str, enabled: bool):
    """Example: Enable/disable a provider."""
    async with async_session_factory() as session:
        result = await session.execute(
            select(AuthProvider).where(AuthProvider.name == name)
        )
        provider = result.scalar_one_or_none()
        
        if provider:
            provider.is_enabled = enabled
            await session.commit()
            print(f"✅ {provider.display_name} {'enabled' if enabled else 'disabled'}")
        else:
            print(f"❌ Provider '{name}' not found")


async def main():
    """Run examples."""
    print("🌱 Example: Using AuthProvider model\n")
    await seed_auth_providers_with_model()
    print()
    await toggle_provider('microsoft', False)


if __name__ == "__main__":
    asyncio.run(main())

